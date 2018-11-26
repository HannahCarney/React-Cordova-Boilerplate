// <<<<<<< HEAD
// import React, { Component } from 'react';
// // import logo from './logo.s'
// import ReactDOM from 'react-dom';
// import './App.css';
// import PropTypes from 'prop-types';
// import App from './App'
// import {Provider} from 'react-redux';
// import {persistStore} from 'redux-persist';
// import store from './store.js'
// import Api from './api.js';

// import Routes from './routes.js';

// import './styles/core.scss';

// Api._setStore(store);

// const startApp = () => {
//   persistStore(store, {
//     whitelist: ['login'],
//     keyPrefix: `${process.env.API_URL}:`
//   }, () => {
//     ReactDOM.render(<App store={store}/>, document.getElementById('root'))
//   });
// };

// if (window.cordova) {
//   document.addEventListener('deviceready', startApp, false);
// }


// // export default function App({store}) {
// //     return (
// //         <Provider store={store}>
// //             <Routes />
// //         </Provider>
// //     );
// // }


// App.propTypes = {
//     store: PropTypes.object.isRequired
// };
// =======

import React, { Component } from 'react';
// import logo from './logo.s'
import ReactDOM from 'react-dom';
import './App.css';
import PropTypes from 'prop-types';
import App from './App'
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import store from './store.js'
import Api from './api.js';

import Routes from './routes.js';

import './styles/core.scss';

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
