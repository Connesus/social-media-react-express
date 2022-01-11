import {api} from "./utils";
import {IUser, SessionUserT, UserLoginDataT} from "@shared/types";
import * as clientConfig from '../../../clientConfig.json';
const {apiBaseUrl} = clientConfig;

// Implementation code where T is the returned data shape

export function requestCreateUser(newUser: UserLoginDataT) {
    return api<SessionUserT>(apiBaseUrl + '/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
        credentials: 'include'
    })
}


export function requestLoginUser(userData: UserLoginDataT) {
    return api<SessionUserT>(apiBaseUrl + '/session/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
    })
}

export function requestLoginStatus() {
    return api<SessionUserT>(apiBaseUrl + '/session/', {
        method: 'GET',
        credentials: 'include'
    })
}
