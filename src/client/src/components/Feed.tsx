import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadMorePosts} from "../redux/slice/post";
import {RootState} from "../redux/store";
import {Post} from "./Post";
import {useEffect} from "react";

export const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const handleLoadMore = () => dispatch(loadMorePosts(null));
  const postFeed = useSelector((state: RootState) => state.post.postFeed);

  useEffect(() => {
    if (postFeed.length === 0) {
      handleLoadMore();
    }
  }, [postFeed])

  return (
    <>
      {postFeed.map((post) => (
        <Post {...post} />
      ))}
      <button onClick={handleLoadMore}>Load More</button>
    </>
  );
};
