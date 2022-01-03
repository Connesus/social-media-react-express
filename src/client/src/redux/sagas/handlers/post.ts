import { call, put } from "@redux-saga/core/effects"
import {requestGetPostById, requestLoadMorePosts} from "../requests/post";
import {addPostsToFeed, setCurrentPost} from '../../slice/post'
import {PayloadAction} from "@reduxjs/toolkit";
import {IPost} from "@shared/types";

export function* handleLoadMorePosts(): Generator<any> {
  try {
    const data = yield call(requestLoadMorePosts);
    // console.log(data)
    if (data && Array.isArray(data)) {
      console.log('MOREDATA!')
      yield put(addPostsToFeed(data))
    } else {
    console.log('LoadMorePosts empty')
      }
  } catch (e) {
    console.error(e);
  }
}

export function* handleGetPostById(action: PayloadAction<string>): Generator<any> {
  try {
    const post = yield call(requestGetPostById, action.payload);

    if (post) {
      yield put(setCurrentPost(post as IPost))
    }
  } catch (e) {
  console.error(e);
}
}
