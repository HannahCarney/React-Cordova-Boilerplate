import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';

import Routes from './routes.js';
export default function App({store}) {


    return (
        <Provider store={store}>
            <Routes/>
        </Provider>
    );
}
App.propTypes = {
    store: PropTypes.object.isRequired
};