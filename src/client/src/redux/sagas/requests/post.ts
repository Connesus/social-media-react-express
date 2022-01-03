import {api} from "./utils";
import {IPost} from "@shared/types";

export function requestLoadMorePosts() {
  return api<IPost[]>('http://localhost:8081/api/post/page', {
    method: 'POST',
    credentials: 'include'
  });
}

export function requestGetPostById(postId: string) {
  return api<IPost>(`http://localhost:8081/api/post/${postId}`, {
    method: 'GET',
    credentials: 'include'
  });
}
