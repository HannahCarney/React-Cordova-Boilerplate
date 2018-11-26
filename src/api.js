import Axios from 'axios';
import {createAction} from 'redux-actions';

export const CLEAR_TOKEN = `${process.env.API_URL}/api/clear-token`;
const clearTokenAction = createAction(CLEAR_TOKEN);

export class TokenExpiredError extends Error {
    constructor(err) {
        super('Auth token expired');
        this.reason = err;
    }
}

const api = Axios.create({
    baseURL: process.env.API_URL
});

// use a setter here to avoid a circular dependency from store -> redux file -> api -> store
let _store;
api._setStore = (store) => {
    _store = store;
};

api.interceptors.request.use((config) => {
    let {
        login: {
            token: authToken
        }
    } = _store.getState();

    if (authToken) {
        config.headers = {
            ...config.headers,
            Authorization: `JWT ${authToken}`   
        };
    }

    return config;
});

function isInvalidTokenResponse(response) {
    //your custom logic for invalid token response here
}

api.interceptors.response.use(undefined, (err) => {
    if (err.response && isInvalidTokenResponse(err.response)) {
        _store.dispatch(clearTokenAction());
        return Promise.reject(new TokenExpiredError(err));
    } else {
        return Promise.reject(err);
    }
});

export default api;
