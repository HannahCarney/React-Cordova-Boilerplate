'use strict';

var path = require('path');
var fs = require('fs');

var path = require('path');

var browserSyncServer = require('./browserSyncServer');

function PrepareBrowser(context) {
    var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();


    browserSyncServer(function (defaults) {
  
        defaults.proxy = "http://localhost:8000"
      
        return defaults;
    }, function (err, servers) {

        // wee hack to override the cordova native browser run script :)
        var theSourceFile = path.join(path.resolve()) + '/scripts/start.js';
        fs.readFile(theSourceFile, function (err, buf) {
            if (typeof buf !== 'undefined') {
                var theDestinationFile = path.join(path.resolve()) + '/platforms/browser/lib/run.js';
                fs.writeFile(theDestinationFile, buf.toString(), function (err) { });
            };
        });
        return deferral.resolve();
    });

}

module.exports = PrepareBrowser;
