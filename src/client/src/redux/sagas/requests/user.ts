import { IUser } from '@backend/model/user';
import { SessionUserT } from '@backend/utils/helpers';
import { DocumentDefinition } from 'mongoose';
import {api} from "./utils";

// Implementation code where T is the returned data shape

export function requestCreateUser(newUser: IUser) {
    return api('http://localhost:8081/api/user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
        credentials: 'include'
    })
}

export type LoginDataT = Omit<DocumentDefinition<IUser>, 'username' | 'id'>

export function requestLoginUser(userData: LoginDataT) {
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
