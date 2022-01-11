import React, {useEffect, useLayoutEffect} from "react"
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfilePostIds, selectProfileIds, clearProfileIds} from "../redux/slice/posts";
import {Post} from "./Post";
import {RootState} from "../redux/store.js";

export const ProfilePage: React.FC<{username?: string, authProfile?: boolean}> = ({username, authProfile}) => {
  const dispatch = useDispatch();
  const profilePostIds = useSelector(selectProfileIds);

  console.log(profilePostIds)

  username = useSelector((state: RootState) =>
    authProfile ? state.auth.username : undefined);

  if (!username && !authProfile) {
    username = (useParams()).authorId;
  }

  useEffect(() => {
    if (username) {
      dispatch(fetchProfilePostIds(username))

    }
  }, [username])

  useLayoutEffect(() => {
    dispatch(clearProfileIds())
  }, [dispatch])

  return <div>{profilePostIds && profilePostIds.map(postId => <Post id={postId} key={postId}/> )}</div>
}
