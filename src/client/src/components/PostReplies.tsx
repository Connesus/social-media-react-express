import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setManyPosts} from '../redux/slice/posts'
import {setManyUsers} from '../redux/slice/users'
import {IPost} from "@shared/types";
import {Post} from "./Post";


export const PostReplies: React.FC<{postId: string, anchor?: string}> = ({postId, anchor}) => {
  const dispatch = useDispatch();
  const [replyIds, setReplyIds] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${process.env.BACKEND_API_URL}/post/paginate/replies`,{
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({postId})
    })
      .then((res) => res.json())
      .then(data => {
        if (data.posts && data.users) {
          dispatch(setManyPosts(data.posts))
          dispatch(setManyUsers(data.posts))
          setReplyIds(data.posts.map((post:IPost) => post._id));
        }
      })
      .catch((e) => console.error(e))
  }, []);
  return <>{replyIds ? replyIds.map((id) => (<Post id={id} key={id}/>)) : <h4>Loading</h4>}</>
}
