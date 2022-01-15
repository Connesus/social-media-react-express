import {api} from "./utils";
import {getPostsResponseT, IPost, IUser} from "@shared/types";
import * as clientConfig from '../../../clientConfig.json';
const {apiBaseUrl} = clientConfig;

export function requestLoadMorePosts(anchor: string | undefined) {
    return api<getPostsResponseT>(apiBaseUrl + '/post/paginate/feed', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({anchor})
  });
}

export function requestGetPostById(postId: string) {
  return api<getPostsResponseT>(`${apiBaseUrl}/post/${postId}`, {
    method: 'GET',
    credentials: 'include'
  });
}

export function requestLikePost(id: string) {
  return api<getPostsResponseT>(apiBaseUrl + '/post/like', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id})
  })
}

export function requestFetchUserPosts(username: string) {
  return api<getPostsResponseT>(apiBaseUrl + '/post/paginate/profile', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({username})
  })
}

export function requestCreatePost(formData: FormData) {
  return api<getPostsResponseT>(apiBaseUrl + '/post/create',{
    method: 'POST',
    credentials: 'include',
    body: formData
  })
}

export function requestFetchPostsByIds(id: string) {
  return api<getPostsResponseT>(apiBaseUrl + '/post/replies', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id})
  })
}

export function requestDeletePost(id: string) {
  return fetch(apiBaseUrl + '/post/delete/' + id, {
    method: 'DELETE',
    credentials: 'include',
  }).then(response => response.ok);
}

export function requestRepost(id: string) {
  return api<getPostsResponseT>(apiBaseUrl+'/post/repost/'+id, {
    method: 'POST',
    credentials: 'include'
  })
}

export function requestSearchPost(text: string) {
  return api<getPostsResponseT>(apiBaseUrl + '/post/paginate/search', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({text})
  })
}
