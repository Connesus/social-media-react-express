import {api} from "./utils";
import {IUser, SessionUserT, UserLoginDataT} from "@shared/types";

// Implementation code where T is the returned data shape

export function requestCreateUser(newUser: UserLoginDataT) {
    return api<SessionUserT>(process.env.BACKEND_API_URL + '/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
        credentials: 'include'
    })
}


export function requestLoginUser(userData: UserLoginDataT) {
    return api<SessionUserT>(process.env.BACKEND_API_URL + '/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
    })
}

export function requestLoginStatus() {
    return api<SessionUserT>(process.env.BACKEND_API_URL + '/user/check/', {
        method: 'GET',
        credentials: 'include',
    })
}

export function requestFetchUserById(id:string) {
    return api<SessionUserT>(process.env.BACKEND_API_URL + '/user/id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
        credentials: 'include'
    })
}
