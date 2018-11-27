/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
<<<<<<< HEAD
  "./precache-manifest.e8fd3abf35f3d7318a362e706b80aea0.js"
=======
<<<<<<< HEAD
  "./precache-manifest.ab89de4d690559d2769a5f62b97c496f.js"
=======
  "./precache-manifest.c4f977c14eec0eaaa640e528844418af.js"
>>>>>>> 4c23655ca20753f5019c116cdbff104ec6962ccd
>>>>>>> 0a6a10dbf6e0e28d2ef7f810c3ed9c94fac122a1
);

workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("./index.html", {
  
  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});
