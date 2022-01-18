import React, {useEffect, useLayoutEffect} from "react"
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfilePostIds, selectProfileIds, clearProfileIds} from "../redux/slice/posts";
import {Avatar, Post} from "./Post";
import {RootState} from "../redux/store";
import styles from '../styles/ProfilePage.module.scss'

export const ProfilePage: React.FC<{username?: string}> = ({username}) => {
  const dispatch = useDispatch();
  const profilePostIds = useSelector(selectProfileIds);
  const authUsername = useSelector((state:RootState) => state.auth.username)

  if (!username) {
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

  const user = useSelector((state: RootState) => userId && state.user.entities[userId]);


  useEffect(() => {
    if (username) {
      dispatch(fetchProfilePostIds(username))
    }
  }, [username])

  useLayoutEffect(() => {
    dispatch(clearProfileIds())
  }, [dispatch])

  return (
    <div className={styles.ProfilePage}>
      {user &&
      <div className={styles.ProfilePage__header}>
        <div className={styles['ProfilePage__header-content']}>
          <Avatar
              username={user.username}
              imageId={user.imageId}
              height='96px'
              width='96px'
          />
          <h4 className={styles['ProfilePage__header-username']}>{user.username}</h4>
        </div>
        <div className={styles['ProfilePage__header-message-container']}>
          {authUsername !== user.username && <button className={styles['ProfilePage__header-message']}>Message</button>}
        </div>
      </div>
      }
      {profilePostIds.length
        ? <div>
            {profilePostIds.map(postId => <Post id={postId} key={postId}/> )}
          </div>
        : <h4>No Posts</h4>
      }
    </div>
  )
}
