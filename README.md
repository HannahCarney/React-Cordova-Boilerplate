
# React Boilerplate Cordova project

A base project for starting new cordova apps. Contains a sane webpack setup, environmental config, redux, axios http client, routing, basic login screen, rollbar error reporting, eslint and CI/Deployment setup for bitbucket/S3. Most importantly: Live reloading of Apps and browsers!

## Instructions for use

* Set the name of your project in `package.json`, using the `name` key before these steps

## Project setup

* `npm install` 
* `sudo npm install -g cordova`
* `cordova platform add ios`
* `cordova platform add browser`
* `cordova platform add android`

## Running locally

* To build the app to your phone permanently:

* `cordova run ios`
* `cordova run android`

* NOTE: this is what the app will look like when live

* To build the app to your phone/browser for development purposes using hot reloading:

* -- --l flag adds live reload to app or browser
* States will be saved using redux

* `cordova run browser -- --l`
* `cordova run android -- --l`
* `cordova run ios -- --l`

 * NOTE: currently only last IP connected to computer - so hot reloading may not work with more than one device plugged into a computer
 * NOTE: on android and iOS certain functionality may not work - this flag is to be used for fast development, but builds should be made without this flag for likeness to real app functionality.


## Environments

* This will run a pre build hook that sets environment config
* default is development

 `target=production cordova run ios`
 `target=development cordova run android`


* use the development flag for live reload

Apache Docs for more info:

https://cordova.apache.org/docs/en/2.8.0/guide/command-line/


