import { takeLatest } from "redux-saga/effects";
import { handleCreateUser, handleLoginUser, handleLoginStatus } from "./handlers/user";
import { createUser, loginUser, getSessionData } from "../slice/user";
import {loadMorePosts} from '../slice/post'
import {handleLoadMorePosts} from "./handlers/post";

export function* watcherSaga() {
    yield takeLatest(createUser.type, handleCreateUser);
    yield takeLatest(loginUser.type, handleLoginUser);
    yield takeLatest(getSessionData.type, handleLoginStatus)
    yield takeLatest(loadMorePosts.type, handleLoadMorePosts)
}
