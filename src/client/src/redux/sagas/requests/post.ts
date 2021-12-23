import {api} from "./utils";

export function requestLoadMorePosts() {
  return api('http://localhost:8081/api/post/page', {
    method: 'POST',
    credentials: 'include'
  });
}
