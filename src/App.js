import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';

import Routes from './routes.js';

import './styles/core.scss';

export default function App({store}) {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
}
App.propTypes = {
    store: PropTypes.object.isRequired
};