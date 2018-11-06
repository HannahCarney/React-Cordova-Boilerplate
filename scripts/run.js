'use strict';

const chalk = require('chalk');
var chalkRainbow = require('chalk-rainbow')


const fs = require('fs');
const path = require('path');


// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('../config/paths')];

process.env.NODE_ENV = process.env.target || 'development';
process.env.BABEL_ENV = process.env.target || 'development';
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

if (process.env.target != undefined) {
    console.log(chalk.green('Setting environment to: ' + process.env.NODE_ENV));
}
else {
    console.log(chalk.green('Using Default Environment: ' + process.env.NODE_ENV));
}

var theSourceFile = path.join(path.resolve()) + '/config/env.' + process.env.NODE_ENV + '.js';
var theDestinationFile = path.join(path.resolve()) + '/config/env.js';

if (fs.existsSync(theSourceFile)) {

    fs.readFile(theSourceFile, function (err, buf) {

        if (typeof buf !== 'undefined') {
            fs.writeFile(theDestinationFile, buf.toString(), function (err) {
                console.log(chalk.green(`wrote env.${process.env.NODE_ENV} to env.js`))
                const env = require('../config/env');

                console.log(chalkRainbow(`You are running on the ${NODE_ENV} server:\n${env.API_URL}`))

                console.log('-----------------------------');
                if (err) throw err;
            });
        }
        else {
            console.log(chalk.red('Config File ' + theSourceFile + ' does not exist\n'));
            // new Confirm(chalk.cyan('Do you want to create this environment?'));

            console.log('-----------------------------');
        }

    });
}
else {
    console.log(chalk.red('Config File ' + theSourceFile + ' does not exist\n'));
    // new Confirm(chalk.cyan('Do you want to create this environment?'));
    console.log('-----------------------------');
}

var NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
    throw new Error(
        'The NODE_ENV environment variable is required but was not specified.'
    );
}

