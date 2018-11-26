import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {autoRehydrate} from 'redux-persist';
import * as reducers from './redux/index.js';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;

export default createStore(
    combineReducers(reducers),
    composeEnhancers(
        applyMiddleware(thunkMiddleware),
        autoRehydrate()
    )
);
