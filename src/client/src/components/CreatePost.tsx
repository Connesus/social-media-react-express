import React, {FormEvent, SyntheticEvent, useCallback, useRef} from "react";
import {useDispatch} from "react-redux";
import {createPostAction} from "../redux/slice/posts";
import {Button} from "./Button";
import styles from '../styles/CreatePost.module.scss';

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
    <form onSubmit={handleCreatePost} className={styles.CreatePost}>
      <textarea name={'text'} placeholder="Post text..."  ref={postTextRef} className={styles.CreatePost__textarea} />
      <div className={styles['CreatePost__buttons-container']}>
        <label className={styles['CreatePost__file-label']}>Upload Image<input type={"file"} name={'file'} placeholder="Upload your file" ref={postFileRef}  className={styles.CreatePost__file}/>
        </label>
        <Button type={"submit"} className={styles.CreatePost__button}>Create Post</Button>
      </div>
    </form>
  )
}
