<<<<<<< HEAD
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

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
}


// export default function App({store}) {
//     return (
//         <Provider store={store}>
//             <Routes />
//         </Provider>
//     );
// }


App.propTypes = {
    store: PropTypes.object.isRequired
};
=======

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './serviceWorker';

const startApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
};

if(window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
>>>>>>> f1d3c5307082537e71f429fb09008db4e5651a83
