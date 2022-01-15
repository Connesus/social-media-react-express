import React, {useEffect, useLayoutEffect} from "react"
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfilePostIds, selectProfileIds, clearProfileIds} from "../redux/slice/posts";
import {Post} from "./Post";
import {RootState} from "../redux/store";

export const ProfilePage: React.FC<{username?: string, authProfile?: boolean}> = ({username, authProfile}) => {
  const dispatch = useDispatch();
  const profilePostIds = useSelector(selectProfileIds);


  // console.log(profilePostIds)

  username = useSelector((state: RootState) =>
    authProfile ? state.auth.username : undefined);

  if (!username && !authProfile) {
    username = (useParams()).authorId;
  }

  const userId = useSelector((state:RootState) => {
    const userObj = state.user.entities
    if (userObj) {
      // console.log(userObj)
      return Object.keys(userObj).find(key => {
        return userObj[key]?.username === username
      })
    }
  })


  useEffect(() => {
    if (username) {
      dispatch(fetchProfilePostIds(username))

    }
  }, [username])

  useLayoutEffect(() => {
    dispatch(clearProfileIds())
  }, [dispatch])

  return <div>{profilePostIds.length
    ? <div>
      {!authProfile && <Link to={'/message/' + userId} >Send Message</Link>}
      {profilePostIds.map(postId => <Post id={postId} key={postId}/> )}
  </div>
    : <h4>No Posts</h4>
  }</div>
}
