import { call, put } from "@redux-saga/core/effects"
import {getPostByIdResponseT, requestGetPostById, requestLoadMorePosts} from "../requests/post";
import {addPostsToFeed, mergePostsById, mergeAuthorsById, } from '../../slice/post'
import {GET_POST_BY_ID_REQUEST, GET_POST_BY_ID_SUCCESS, GET_POST_BY_ID_FAIL} from '../../slice/request'
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

export function* handleGetPostById({payload}: PayloadAction<{postId: string; reqId: string}>): Generator<any, any, getPostByIdResponseT> {
  const {postId, reqId} = payload;
  try {
    yield put(GET_POST_BY_ID_REQUEST(reqId));
    const response: getPostByIdResponseT = yield call(requestGetPostById, postId);

    yield put(mergePostsById(response.posts))
    yield put(mergeAuthorsById(response.authors))

    yield put(GET_POST_BY_ID_SUCCESS(reqId))
  } catch (error) {
    if (error instanceof Error) {

      yield GET_POST_BY_ID_FAIL({id: reqId, error: error.message});
    }
}
}
