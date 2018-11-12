var fs = require('fs'),
    path = require('path'),
    nopt  = require('nopt'),
    url = require('url'),
    runForrest = require('./start'),
    cordovaServe = require('cordova-serve');

var args = process.argv;

start(args);

function start(argv) {
    var args  = nopt({'help': Boolean, 'target': String, 'port': Number}, {'help': ['/?', '-h', 'help', '-help', '/help']}, argv);
    if(args.help) {
        help();
    }
    else {
        return runForrest.run(args);
    }
}