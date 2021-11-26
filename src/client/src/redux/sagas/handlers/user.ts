import { IUser } from './../../../../../server/src/model/user';
import { call } from "@redux-saga/core/effects"
import { requestCreateUser, requestLoginUser, requestLoginStatus } from "../requests/user";
import { LoginDataT } from '../requests/user';
import { PayloadAction } from '@reduxjs/toolkit';
import { StrictEffect } from '@redux-saga/types';

export function* handleCreateUser(action: PayloadAction<IUser>): Generator<any> {
    try {
        const response = yield call(requestCreateUser, action.payload);
    } catch (error) {
        console.error(error);
    }
}

export function* handleLoginUser(action: PayloadAction<LoginDataT>): Generator<any> {
    try {
        const response = yield call(requestLoginUser, action.payload);
    } catch (error) {
        console.error(error);
    }
}

export function* handleLoginStatus(): Generator<StrictEffect, void, Response> {
    try {
        const response = yield call(requestLoginStatus);
        const data = yield call([response, 'json'])
        console.log(response)
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}