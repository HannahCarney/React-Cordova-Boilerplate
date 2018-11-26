
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App'
import {persistStore} from 'redux-persist';
import store from './store.js'
import Api from './api.js';

Api._setStore(store);

const startApp = () => {
  persistStore(store, {
        whitelist: ['login'],
        keyPrefix: `${process.env.API_URL}:`
      }, () => {
        ReactDOM.render(<App store={store}/>, document.getElementById('root'))
      });
};

if(window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
