'use strict';

var path = require('path');
var fs = require('fs');
const paths = require('../config/paths');

var path = require('path');
var Patcher = require('./Patcher');

var browserSyncServer = require('./browserSyncServer');

function parseOptions(opts) {
    var result = {};
    opts = opts || [];
    opts.forEach(function (opt) {
        var parts = opt.split(/=/);
        result[parts[0].replace(/^-+/, '')] = parts[1] || true;
    });
    return result;
}

function Prepare(context) {
    var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    var options = parseOptions(context.opts.options.argv);
    options['index'] = typeof options['index'] !== 'undefined' ? options['index'] : 'index.html';

    // if (typeof options['live-reload'] === 'undefined') {
    //     return;
    // }
    var enableCors = typeof options['enable-cors'] !== 'undefined';

    var ignoreOptions = {};
    if (typeof options['ignore'] !== 'undefined') {
        ignoreOptions = { ignored: options['ignore'] };
    }

    // TODO - Enable live reload servers

    var platforms = ['browser', 'ios'];
    var patcher = new Patcher(context.opts.projectRoot, platforms);
    patcher.prepatch();
    var changesBuffer = [];
    var changesTimeout;
    var serversFromCallback = [];
    platforms.forEach(function (platform) {
     
        var bs = browserSyncServer(function (defaults) {
            if (enableCors) {
                defaults.middleware = function (req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    next();
                }
            }

            defaults.files.push({
                match: ['src/*.*'],
                fn: function (event, file) {
                    if (event === 'change') {
                        changesBuffer.push(file);
                        if (changesTimeout) {
                            clearTimeout(changesTimeout);
                        }
                        changesTimeout = setTimeout(function () {
                            context.cordova.prepare().then(function () {
                                patcher.addCSP({
                                    index: options.index,
                                    servers: serversFromCallback, //need this for building proper CSP
                                });
                                bs.reload();
                                //  bs.reloadWindow();
                                //   window.location.reload(true);
                                changesBuffer = [];
                            });
                        }, 2000);
                    }
                },
                options: ignoreOptions
            });


            if (typeof options['host'] !== 'undefined') {
                defaults.host = options['host'];
            }

            if (typeof options['port'] !== 'undefined') {
                defaults.port = options['port'];
            }

            if (typeof options['online'] !== 'undefined') {
                defaults.online = options['online'].toLocaleLowerCase() !== 'false';
            }

            if (typeof options['https'] !== 'undefined') {
                defaults.https = true;
            }

            if (platform !== "browser") {
                defaults.server = {
                    baseDir: context.opts.projectRoot,
                    routes: {}
                };
                var www = patcher.getWWWFolder(platform);
                console.log("WWW: " + www)
                defaults.server.routes['/' + www.replace('\\','/')] = path.join(context.opts.projectRoot, www);
                var theSourceFile = path.join(path.resolve()) + '/scripts/run-ios.js';
                fs.readFile(theSourceFile, function (err, buf) {
                    if (typeof buf !== 'undefined') {
                        var theDestinationFile = path.join(path.resolve()) + `/platforms/${platform}/cordova/lib/run.js`;
                        console.log(theDestinationFile)
                        fs.writeFile(theDestinationFile, buf.toString(), function (err) {
                            console.log("error: " + err)
                         });
                    };
                });
            }

            return defaults;
        },
            platform, platforms.indexOf(platform), function (err, servers) {
                if (platform === "browser") {
                    // wee hack to override the cordova native browser run script :)
                    var theSourceFile = path.join(path.resolve()) + '/scripts/start.js';
                    fs.readFile(theSourceFile, function (err, buf) {
                        if (typeof buf !== 'undefined') {
                            var theDestinationFile = path.join(path.resolve()) + '/platforms/browser/lib/run.js';
                            fs.writeFile(theDestinationFile, buf.toString(), function (err) { });
                        };
                    });
                    return deferral.resolve();
                }
                else {
                    serversFromCallback = servers;
                    patcher.patch({
                        servers: servers,
                        index: options.index
                    });
                    return deferral.resolve();
                }

            });
    });
}

module.exports = Prepare;
