import { IUser } from '@backend/model/user';
import { call, put } from "@redux-saga/core/effects"
import { requestCreateUser, requestLoginUser, requestLoginStatus } from "../requests/user";
import { LoginDataT } from '../requests/user';
import { PayloadAction } from '@reduxjs/toolkit';
import { StrictEffect } from '@redux-saga/types';
import { setSessionData, setLoginStatus } from '../../slice/user';
import { SessionUserT } from '@backend/utils/helpers';

export function* handleCreateUser(action: PayloadAction<IUser>): Generator<any> {
    try {
        const response = yield call(requestCreateUser, action.payload);
    } catch (error) {
        console.error(error);
    }
}

export function* handleLoginUser(action: PayloadAction<LoginDataT>): Generator<StrictEffect, void, SessionUserT> {
    try {
        const data = yield call(requestLoginUser, action.payload);
        if (data) {
            yield put(setSessionData(data));
        }
        yield put(setLoginStatus(Boolean(data)))
        console.log(data)
    } catch (error) {
        console.error(error);
    }
}

export function* handleLoginStatus(): Generator<StrictEffect, void, SessionUserT> {
    try {
        const data = yield call(requestLoginStatus);
        if (data) {
            yield put(setSessionData(data));
        }
        yield put(setLoginStatus(Boolean(data)))

    } catch (error) {
        console.error(error);
    }
}