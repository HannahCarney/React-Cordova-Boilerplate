
# React Boilerplate Cordova project

A base project for starting new cordova apps. Contains a sane webpack setup, environmental config, redux, axios http client, routing, basic login screen, rollbar error reporting, eslint and CI/Deployment setup for bitbucket/S3.

## Instructions for use

* Set the name of your project in `package.json`, using the `name` key before these steps

## Project setup

* `npm install` 
* `sudo npm install -g cordova`
* `cordova platform add android`
* `cordova platform add ios`
* `cordova platform add browser`
* `cordova build`

## Running locally

run `cordova run android/ios/broswer`

## Environments

* This will run a pre build hook that sets environment config
* default is development

 `target=production cordova run ios`
 `target=development cordova run android`

* use the -- --live-reload flag for live reloading

Apache Docs for my info:

https://cordova.apache.org/docs/en/2.8.0/guide/command-line/

`target=dev cordova run browser -- --live-relaod`
`cordova run -- --live-reload --https`
