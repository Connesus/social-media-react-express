import React from "react"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {selectRequestsState, STATUS} from "../redux/slice/requests";
import {fetchPostById} from "../redux/slice/posts";
import {Post} from "./Post";

const generateId = () => crypto.getRandomValues(new Uint32Array(2)).join('');

const selectRequestStatus = () => {}

export const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const [getPostRequestId, setRequestId] = useState(generateId());
  // const [postData, setPostData] = useState<{ post: IPost; author: IUser} | undefined >(undefined);

  // const reqStatus = useSelector<RootState, RequestStatus>(state =>
    // requestSelector(state)[getPostRequestId])

  // const post = reqStatus.status === STATUS.SUCCESS && postId ? useSelector<RootState, IPost | undefined>(state => state.post.posts[postId]) : undefined;
  // const author = reqStatus.status === STATUS.SUCCESS && post ? useSelector<RootState, IUser | undefined>(state => state.post.authors[post.author]) : undefined
  // console.log(reqStatus)
  // console.log(postData)
  // setPostData()
  // const reqStatus = useSelector((state:RootState) =>
  //   selectRequestsState.selectById(state, getPostRequestId || '_'), ((left, right) => right?.status !== STATUS.ERROR));
  // const allRequests = useSelector(selectRequestsState.selectAll)
  // console.log(reqStatus)

  // console.log(post)

  // const post = useSelector(((state:RootState) => {
  //   if (reqStatus && reqStatus.status === STATUS.SUCCESS) {
  //     const post = state.post.posts[postId || 'undefined']
  //     const author = state.post.authors[post.author || 'undefined']
  //     if (post && author) {
  //       return {post, author}
  //     }
  //   }
  //   return undefined;
  // }), shallowEqual)

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById({postId, reqId: getPostRequestId}))
    }
  }, [postId])

  return <Post id={postId} showReplies />
  // const currentPost = useSelector((state: RootState) =>
  //   typeof postId === 'string' ? state.post.posts[postId] : undefined
  // );
  // const postAuthor = useSelector((state: RootState) =>
  //   currentPost && typeof currentPost.author === 'string' ? state.post.authors[currentPost.author] : undefined
  // );

  // const [currentPost, setCurrentPost] = useState({} as IPost);
  // const [postAuthor, setPostAuthor] = useState({} as IUser);
  //
  // console.log(currentPost)
  // console.log(postAuthor)
  //
  // useEffect(() => {
  //   if (currentPost && typeof currentPost.author === 'string') {
  //     setPostAuthor(useSelector((state: RootState) => state.post.authors[currentPost.author as string]))
  //   }
  // }, [currentPost])
  //
  // setCurrentPost(useSelector((state: RootState) => state.post.posts[postId as string]))
  //
  //
  // useEffect(() => {
  //   if (postId) {
  //   dispatch(getPostById(postId));
  //     }
  // }, [postId]);

  // return <>{(currentPost && postAuthor) && <Post post={currentPost} author={postAuthor} />}</>
}
