import { call, put } from "@redux-saga/core/effects"
import {
  requestCreatePost, requestDeletePost, requestFetchPostsByIds,
  requestFetchUserPosts,
  requestGetPostById,
  requestLikePost,
  requestLoadMorePosts, requestRepost, requestSearchPost,
} from "../requests/post";
// import {addPostsToFeed, mergePostsById, getPostByIdRequestActions,} from '../../slice/post'
import {setManyUsers} from '../../slice/users'
import {PayloadAction, Update} from "@reduxjs/toolkit";
import {getPostsResponseT, IPost} from "@shared/types";
import {
  fetchPostByIdRequestActions,
  setManyPosts,
  addToFeed,
  addToProfileIds,
  upsertManyPosts,
  deleteOnePost,
  setSearchIds
} from "../../slice/posts";
import { StrictEffect } from '@redux-saga/types';
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

export function* handleLoadMorePosts(action: PayloadAction<string | undefined>): Generator<any, any, getPostsResponseT> {
  try {
    // @ts-ignore
    const response: getPostsResponseT = yield call(requestLoadMorePosts, action.payload);

    if (Array.isArray(response.users) && Array.isArray(response.posts)) {
      const feedIds = response.posts.map(post => post._id);
      yield put(addToFeed(feedIds));
      yield put(setManyPosts(response.posts))
      yield put(setManyUsers(response.users))
    }
  } catch (e) {
    console.error(e);
  }
}

export function* handleGetPostById({payload}: PayloadAction<{postId: string; reqId: string}>): Generator<any, any, getPostsResponseT> {
  const {postId, reqId} = payload;
  try {
    yield put(fetchPostByIdRequestActions.Request(reqId));
    const response: getPostsResponseT = yield call(requestGetPostById, postId);

    yield put(setManyPosts(response.posts))
    yield put(setManyUsers(response.users))

    yield put(fetchPostByIdRequestActions.Success(reqId))
  } catch (error) {
    if (error instanceof Error) {

      yield fetchPostByIdRequestActions.Error({id: reqId, error: error.message});
    }
}
}

export function* handleLikePost(action: PayloadAction<string>): Generator<any, any, getPostsResponseT> {
  const postId = action.payload;
  try {
    const response: getPostsResponseT = yield call(requestLikePost, postId);

    yield put(setManyPosts(response.posts));
  } catch (e) {
    console.error(e);
  }
}


export function* handleFetchUserPosts(action: PayloadAction<string>): Generator<any, any,getPostsResponseT> {
  const username = action.payload;
  try {
    const response: getPostsResponseT = yield call(requestFetchUserPosts, username);

    // yield put(addToProfileIds(response.posts || []))

    const postIds = Array.isArray(response.posts) ? response.posts?.map(post => post._id) : [];
    console.log('pIds', postIds)
    yield put(addToProfileIds(postIds))
    yield put(setManyPosts(response.posts));
    yield put(setManyUsers(response.users));

  } catch (e) {
    console.error(e);
  }
}

export function* handleCreatePost(action: PayloadAction<FormData>): Generator<any, any, getPostsResponseT> {
  const formData = action.payload;
  try {
    const response: getPostsResponseT = yield call(requestCreatePost, formData);
    console.log(response);
  } catch (e) {
    console.error(e)
  }
}


export function* handleReplyToPost(action: PayloadAction<FormData>): Generator<any, any, getPostsResponseT> {
  const formData = action.payload;
  try {
    const response: getPostsResponseT = yield call(requestCreatePost, formData);
    if (response.posts && Array.isArray(response.posts)) {
      const ids = response.posts.map(post => post._id);
      yield put(upsertManyPosts(response.posts));
    }
    console.log(response);

  } catch (e) {
    console.error(e)
  }
}

export function* handleFetchPostsByIds(action: PayloadAction<string>): Generator<any, any, getPostsResponseT> {
  const postId = action.payload;
  try {
    const response: getPostsResponseT = yield call(requestFetchPostsByIds, postId)
    if (response.posts) {
      yield put(upsertManyPosts(response.posts));
    }
    console.log(response)
  } catch (e) {
    console.error(e)
  }
}

export function* handleDeletePost(action: PayloadAction<string>): Generator<any, any, Boolean> {
  const postId = action.payload;
  try {
    const response: Boolean = yield call(requestDeletePost, postId);

    if (response) {
      // Delete post by id from cache
      yield put(deleteOnePost(postId))
    }
  } catch (e) {
    console.error(e)
  }
}

export function* handleRepost(action: PayloadAction<string>): Generator<any, any, getPostsResponseT> {
  const postId = action.payload;
  try {
    const response: getPostsResponseT = yield call(requestRepost, postId);

    if (response.posts) {
      yield put(upsertManyPosts(response.posts))
    }
  } catch (e) {
    console.error(e)
  }
}

export function* handleSearchPosts(action: PayloadAction<string>): Generator<any, any, getPostsResponseT> {
  const searchText = action.payload;
  try {
    const response: getPostsResponseT = yield call(requestSearchPost, searchText);

    if (response) {
      if (Array.isArray(response.posts)) {
        const searchIds = response.posts.map((post => post._id))
        yield put(setSearchIds(searchIds))
        yield put(setManyPosts(response.posts))
      }
      if (response.users) {
        yield put(setManyUsers(response.users))
      }
    }
  } catch (e) {
    console.error(e)
  }
}
