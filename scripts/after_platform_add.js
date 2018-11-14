'use strict';

var path = require('path');
var fs = require('fs');

var path = require('path');

// override the default run scripts for each platform
function load(context) {
    var platforms = context.opts.platforms;
    platforms.forEach(function(platform) {
        // wee hack to override the cordova native browser run script
        var theSourceFile = path.join(path.resolve()) + `/scripts/run-${platform}.js`;
        fs.readFile(theSourceFile, function (err, buf) {
            if (typeof buf !== 'undefined') {
                console.info(`rebuilding ${platform} script`)
                var theDestinationFile = path.join(path.resolve()) + `/platforms/${platform}/cordova/lib/run.js`;
                fs.writeFile(theDestinationFile, buf.toString(), function (err) { });
            };
        });
    });
}

module.exports = load;


