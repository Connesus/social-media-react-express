import { call, put } from "@redux-saga/core/effects"
import {requestLoadMorePosts} from "../requests/post";
import {addPostsToFeed} from '../../slice/post'
import {PayloadAction} from "@reduxjs/toolkit";

export function* handleLoadMorePosts(): Generator<any> {
  try {
    const data = yield call(requestLoadMorePosts);
    if (data) {
      yield put(addPostsToFeed(data))
    }
    console.log('LoadMorePosts empty')
  } catch (e) {
    console.error(e);
  }
}

// export function* handleGetPostById(action: PayloadAction<string>): Generator<any> {
//   try {
//     const post = yield call(() => {});
//     if (post) {
//       yield put(set)
//     }
//   } catch (e) {
//   console.error(e);
// }
// }
