import {api} from "./utils";
import {getPostsResponseT, IPost, IUser} from "@shared/types";

export function requestLoadMorePosts(anchor: string | undefined) {
    return api<getPostsResponseT>(process.env.BACKEND_API_URL + '/post/paginate/feed', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({anchor})
  });
}

export function requestGetPostById(postId: string) {
  return api<getPostsResponseT>(`${process.env.BACKEND_API_URL}/post/${postId}`, {
    method: 'GET',
    credentials: 'include'
  });
}

export function requestLikePost(id: string) {
  return api<getPostsResponseT>(process.env.BACKEND_API_URL + '/post/like', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id})
  })
}

export function requestFetchUserPosts(username: string) {
  return api<getPostsResponseT>(process.env.BACKEND_API_URL + '/post/paginate/profile', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({username})
  })
}

export function requestCreatePost(formData: FormData) {
  return api<getPostsResponseT>(process.env.BACKEND_API_URL + '/post/create',{
    method: 'POST',
    credentials: 'include',
    body: formData
  })
}

export function requestFetchPostsByIds(id: string) {
  return api<getPostsResponseT>(process.env.BACKEND_API_URL + '/post/replies', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id})
  })
}

export function requestDeletePost(id: string) {
  return fetch(process.env.BACKEND_API_URL + '/post/delete/' + id, {
    method: 'DELETE',
    credentials: 'include',
  }).then(response => response.ok);
}

export function requestRepost(id: string) {
  return api<getPostsResponseT>(process.env.BACKEND_API_URL+'/post/repost/'+id, {
    method: 'POST',
    credentials: 'include'
  })
}

export function requestSearchPost(text: string) {
  return api<getPostsResponseT>(process.env.BACKEND_API_URL + '/post/paginate/search', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({text})
  })
}
