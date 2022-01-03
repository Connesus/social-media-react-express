import * as React from "react";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Post} from "./Post";
import {getPostById} from '../redux/slice/post'
import {RootState} from "../redux/store.js";

export const PostPage = () => {
  const {postId} = useParams();
  const dispatch = useDispatch();
  const currentPost = useSelector((state: RootState) => state.post.currentPost)

  useEffect(() => {
    if (postId) {
    dispatch(getPostById(postId));
      }
    console.log(postId)
  }, [postId]);

  return <>{currentPost && <Post {...currentPost} />}</>
}
