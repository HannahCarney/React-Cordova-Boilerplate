import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';

import Routes from './routes.js';

import './styles/core.scss';

export default function App({store}) {
    return (
<<<<<<< HEAD
        <Provider store={store}>
            <Routes />
        </Provider>
=======
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code>
          </p>
          <a
            className="App-link"
            href="https://github.com/HannahCarney/React-Cordova-Boilerplate"
            target="_blank"
            rel="noopener noreferrer"
          >
          Github repo

          </a>
        </header>
      </div>
>>>>>>> f1d3c5307082537e71f429fb09008db4e5651a83
    );
}
App.propTypes = {
    store: PropTypes.object.isRequired
};