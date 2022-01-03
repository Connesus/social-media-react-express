import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadMorePosts} from "../redux/slice/post";
import {RootState} from "../redux/store";
import {Post} from "./Post";
import {useEffect} from "react";
import styles from '../styles/Feed.module.scss';

export const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const handleLoadMore = () => dispatch(loadMorePosts(undefined));
  // @ts-ignore
  const postFeed = useSelector((state: RootState) => state.post.postFeed);

  useEffect(() => {
    if (postFeed.length === 0) {
      handleLoadMore();
    }
  }, [postFeed])

  return (
      <div className={styles.Feed}>
      {postFeed && postFeed.map((post, index) => <Post {...post} key={index} /> )}
      <button onClick={handleLoadMore}>Load More</button>
      </div>
  );
};
