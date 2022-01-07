import {api} from "./utils";
import {IPost, IUser} from "@shared/types";

export function requestLoadMorePosts() {
  return api<IPost[]>('http://localhost:8081/api/post/page', {
    method: 'POST',
    credentials: 'include'
  });
}

export type getPostByIdResponseT = {
  posts: {[_id: string]: IPost};
  authors: {[_id: string]: IUser};
}

export function requestGetPostById(postId: string) {
  return api<getPostByIdResponseT>(`http://localhost:8081/api/post/${postId}`, {
    method: 'GET',
    credentials: 'include'
  });
}
