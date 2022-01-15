import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {Post} from "./Post";
import {useCallback, useEffect, useState} from "react";
import styles from '../styles/Feed.module.scss';
import {fetchMoreFeedPosts, selectFeedIds} from "../redux/slice/posts";

export const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const feedPostIds = useSelector<RootState, string[]>(selectFeedIds);

  useEffect(() => {
    if (feedPostIds.length === 0) {
      dispatch(fetchMoreFeedPosts())
    }
  }, [feedPostIds])

  const handleLoadMoreButton = useCallback(() => {
    const anchorPost = feedPostIds[feedPostIds.length - 1];
    dispatch(fetchMoreFeedPosts(anchorPost))
  }, [feedPostIds])

  return (
      <div className={styles.Feed}>
        {feedPostIds.map((postId) => <Post id={postId} key={postId} />)}
        <button onClick={handleLoadMoreButton}>LOAD MORE</button>
      </div>
  );
};
