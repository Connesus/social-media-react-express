import { IUser } from '@backend/model/user';

// Implementation code where T is the returned data shape
function api<T>(url: string, options: RequestInit | undefined): Promise<T> {
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<T>
        })
}

export function requestCreateUser(newUser: IUser) {
    return api('http://localhost:8081/api/user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
        credentials: 'include'
    })
}

export type LoginDataT = Omit<IUser, 'username'>

export function requestLoginUser(userData: LoginDataT) {
    return fetch('http://localhost:8081/api/session/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
    })
}

export function requestLoginStatus() {
    return fetch('http://localhost:8081/api/session/', {
        method: 'GET',
        credentials: 'include'
    })
}