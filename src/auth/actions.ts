import {Action, ActionTypes} from './reducer';
import React from 'react';
import {baseUrl} from '../utils/apiUtils';

export type LoginPayload = {
    username: string,
    password: string,
}

export const loginUser = async (dispatch: React.Dispatch<Action>, payload: LoginPayload) => {
    dispatch({type: ActionTypes.RequestLogin});
    const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const token = await response.json();
        const data: {token: string} = {
            token: token,
        }
        dispatch({ type: ActionTypes.LoginSuccess, payload: data});
        localStorage.setItem('token', data.token);
    } else {
        const error = await response.json();
        dispatch({type: ActionTypes.LoginError, error})
    }
}

export const logoutUser = async (dispatch: React.Dispatch<Action>) => {
    dispatch({ type: ActionTypes.Logout });
    localStorage.removeItem('token');
}
