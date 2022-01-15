import {api} from "./utils";
import {IUser, SessionUserT, UserLoginDataT} from "@shared/types";
import * as clientConfig from '../../../clientConfig.json';
const {apiBaseUrl} = clientConfig;

// Implementation code where T is the returned data shape

export function requestCreateUser(newUser: UserLoginDataT) {
    return api<SessionUserT>(apiBaseUrl + '/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
        credentials: 'include'
    })
}


export function requestLoginUser(userData: UserLoginDataT) {
    return api<SessionUserT>(apiBaseUrl + '/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
    })
}

export function requestLoginStatus() {
    return api<SessionUserT>(apiBaseUrl + '/user/check/', {
        method: 'GET',
        credentials: 'include',
    })
}

export function requestFetchUserById(id:string) {
    return api<SessionUserT>(apiBaseUrl + '/user/id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
        credentials: 'include'
    })
}
