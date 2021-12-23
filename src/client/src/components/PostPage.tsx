import * as React from "react";
import {Post, PostT} from "./Post";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

export const PostPage = () => {
  const {postId} = useParams();
  const dispatch = useDispatch();
  let post: PostT;

  useEffect(() => {
    // dispatch();
    console.log(postId)
  }, [postId]);

  return <>'In dev'</>
  // return <Post  { ...post}/>
}
