import React, {FormEvent, SyntheticEvent, useCallback, useRef} from "react";
import {useDispatch} from "react-redux";
import {createPostAction} from "../redux/slice/posts";

export const CreatePost: React.FC<{replyTo?: string}> = ({replyTo}) => {
  const dispatch = useDispatch();
  const postTextRef = useRef<HTMLTextAreaElement>(null);
  const postFileRef = useRef<HTMLInputElement>(null);

  const handleCreatePost = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    if (postTextRef && postFileRef) {
      const formData = new FormData();

      if (postTextRef.current && postFileRef.current && postFileRef.current.files) {
        formData.append('file', postFileRef.current.files[0]);
        formData.append('text', postTextRef.current.value);
      } else if (postTextRef.current && !postFileRef.current) {
        formData.append('text', postTextRef.current.value);
      } else if (!postTextRef.current && postFileRef.current && postFileRef.current.files) {
        formData.append('file', postFileRef.current.files[0])
      }

      if (replyTo) {
        formData.append('replyTo', replyTo);
      }

      if (formData.has('file' || formData.has('text'))) {
        dispatch(createPostAction(formData));
      }
    }
  },[postTextRef, postFileRef]);

  return (
    <form onSubmit={handleCreatePost}>
      <textarea name={'text'} placeholder="Post text..."  ref={postTextRef} />
      <input type={"file"} name={'file'} placeholder="Upload your file" ref={postFileRef}/>
      <button type={"submit"}>Create Post</button>
    </form>
  )
}
