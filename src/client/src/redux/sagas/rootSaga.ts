import { takeLatest } from "redux-saga/effects";
import { handleCreateUser, handleLoginUser, handleLoginStatus } from "./handlers/user";
import { createUser, loginUser, getSessionData } from "../slice/user";

export function* watcherSaga() {
    yield takeLatest(createUser.type, handleCreateUser);
    yield takeLatest(loginUser.type, handleLoginUser);
    yield takeLatest(getSessionData.type, handleLoginStatus)
}
