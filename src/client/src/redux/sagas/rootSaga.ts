import { takeLatest } from "redux-saga/effects";
import {handleCreateUser, handleLoginUser, handleLoginStatus, handleFetchUserById} from "./handlers/user";
import {createUser, loginUser, fetchSessionData} from '../slice/auth'
import {
    handleCreatePost, handleDeletePost, handleFetchPostsByIds,
    handleFetchUserPosts,
    handleGetPostById,
    handleLikePost,
    handleLoadMorePosts, handleReplyToPost, handleRepost, handleSearchPosts
} from "./handlers/post";
import {
    createPostAction, deletePostAction,
    fetchMoreFeedPosts,
    fetchPostById, fetchPostReplies,
    fetchProfilePostIds,
    likePostAction,
    replyToPostAction, repostPostAction, searchPosts
} from "../slice/posts";
import {fetchUserById} from "../slice/users";

export function* watcherSaga() {
    yield takeLatest(createUser.type, handleCreateUser);
    yield takeLatest(loginUser.type, handleLoginUser);
    yield takeLatest(fetchSessionData.type, handleLoginStatus)
    yield takeLatest(fetchMoreFeedPosts.type, handleLoadMorePosts);
    yield takeLatest(fetchPostById.type, handleGetPostById)
    yield takeLatest(likePostAction.type, handleLikePost)
    yield takeLatest(fetchProfilePostIds.type, handleFetchUserPosts);
    yield takeLatest(createPostAction.type, handleCreatePost);
    yield takeLatest(replyToPostAction.type, handleReplyToPost);
    yield takeLatest(fetchPostReplies.type, handleFetchPostsByIds);
    yield takeLatest(deletePostAction.type, handleDeletePost);
    yield takeLatest(repostPostAction.type, handleRepost)
    yield takeLatest(fetchUserById.type, handleFetchUserById);
    yield takeLatest(searchPosts.type, handleSearchPosts)
}
