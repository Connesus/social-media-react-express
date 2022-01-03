import {api} from "./utils";
import {IUser, SessionUserT, UserLoginDataT} from "@shared/types";

// Implementation code where T is the returned data shape

export function requestCreateUser(newUser: IUser) {
    return api('http://localhost:8081/api/user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
        credentials: 'include'
    })
}


export function requestLoginUser(userData: UserLoginDataT) {
    return api<SessionUserT>('http://localhost:8081/api/session/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
    })
}

export function requestLoginStatus() {
    return api<SessionUserT>('http://localhost:8081/api/session/', {
        method: 'GET',
        credentials: 'include'
    })
}
