
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

* Note: Adding platforms will also run browser running the platform files project
* You can escape with Ctrl+C

## Running locally

* `cordova run browser -- --l`
* -- --l flag adds live reload to app or browser
* `cordova run android -- --l`
* `cordova run ios`
* `cordova run ios -- --l`

## Environments

* This will run a pre build hook that sets environment config
* default is development

 `target=production cordova run ios`
 `target=development cordova run android`

* use the development flag for live reload

Apache Docs for more info:

https://cordova.apache.org/docs/en/2.8.0/guide/command-line/


