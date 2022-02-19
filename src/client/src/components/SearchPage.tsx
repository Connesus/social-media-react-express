import React, {useCallback, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {searchPosts} from "../redux/slice/posts";
import {Post} from "./Post";
import {Button} from "./Button";

export const SearchPage: React.FC = () => {
  const searchIds = useSelector((state: RootState) => state.post.searchIds);
  const postTextRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  const handleSearchButton = useCallback(() => {
    if (postTextRef?.current?.value) {
      dispatch(searchPosts(postTextRef.current.value))
    }
  }, [postTextRef])

  return (
    <div>
      <div>
        <textarea ref={postTextRef} placeholder='Enter post text'></textarea>
        <Button onClick={handleSearchButton}>Search</Button>
      </div>
      <div>
        {searchIds && searchIds.map(id => <Post id={id} />)}
      </div>
    </div>
  )
}
