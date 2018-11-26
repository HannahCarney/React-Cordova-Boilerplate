import {handleActions, createAction} from 'redux-actions';

import {fetchActions, fetchSuccess} from './utils.js';
import Api from '../api.js';

export const LOGIN = `${__dirname}/login/login`;
const loginActions = fetchActions(LOGIN);
export const LOGOUT = `${__dirname}/login/logout`;

export function login(username, password) {
    return (dispatch) => {
        dispatch(loginActions.started());

        return Api.post(`${process.env.API_URL}`, {username, password})
            .catch((err) => {
                dispatch(loginActions.error(err));
                return Promise.reject(err);
            })
            .then((res) => dispatch(loginActions.success(res.data)));
    };
}

export function logout () {
    return createAction(LOGOUT)();
}

const initialState = {token: false};

export default handleActions({
    [fetchSuccess(LOGIN)]: (state, action) => {
        return {
            ...state,
            token: action.payload.access_token
        };
    },
    [LOGOUT]: () => initialState
}, initialState);