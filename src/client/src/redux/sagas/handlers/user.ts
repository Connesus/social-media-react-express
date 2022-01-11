import { call, put } from "@redux-saga/core/effects"
import { requestCreateUser, requestLoginUser, requestLoginStatus } from "../requests/user";
import { PayloadAction } from '@reduxjs/toolkit';
import { StrictEffect } from '@redux-saga/types';
import {setLoginData} from '../../slice/auth'
import {IUser, SessionUserT, UserLoginDataT} from "@shared/types";

export function* handleCreateUser(action: PayloadAction<UserLoginDataT>): Generator<StrictEffect, void, SessionUserT> {
    try {
        const response = yield call(requestCreateUser, action.payload);

        if (response) {
            const role = response.role || 'user';
            yield put(setLoginData({...response, role}));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* handleLoginUser(action: PayloadAction<UserLoginDataT>): Generator<StrictEffect, void, SessionUserT> {
    try {
        const data = yield call(requestLoginUser, action.payload);
        console.log(action.payload)

        if (data) {
            const role = data.role ? data.role : (data.id ? 'user' : 'guest')
            yield put(setLoginData({...data, role}));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* handleLoginStatus(): Generator<StrictEffect, void, SessionUserT> {
    try {
        const data = yield call(requestLoginStatus);
        console.log(data)
        if (data) {
            const role = data.role ? data.role : (data.id ? 'user' : 'guest')
            yield put(setLoginData({...data, role}));
        }
    } catch (error) {
        console.error(error);
    }
}
