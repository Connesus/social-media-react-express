import React, {useCallback} from "react"
import style from '../styles/Post.module.scss';
import {Link, useNavigate} from "react-router-dom";
import jdenticon from "jdenticon/standalone";
import {memo, useEffect, useState} from "react";
import {RepostIcon} from "./icons/RepostIcon";
import {LikeIcon} from "./icons/LikeIcon";
import {CommentIcon} from "./icons/CommentIcon";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {
  deletePostAction,
  fetchPostReplies,
  likePostAction,
  replyToPostAction, repostPostAction,
  selectPostState
} from "../redux/slice/posts";
import {selectUserState} from "../redux/slice/users";
import {CreatePost} from "./CreatePost";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {DotsIcon} from "./icons/Dots";
import {PostReplies} from "./PostReplies";

const formatPostDate = (date: Date) => `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;


export const Post: React.FC<{id?: string, authorId?: string, showReplies?: boolean}> =memo(
  ({id, showReplies}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const post = useSelector((state:RootState) => id && selectPostState.selectById(state, id));
  // const author = useSelector((state:RootState) => post && selectUserState.selectById(state, post.author));
    const authData = useSelector((state: RootState) => state.auth);
  const {post, author} = useSelector((state: RootState) => {
    if (id) {
      const post = selectPostState.selectById(state, id);
      if (post) {
        const author = selectUserState.selectById(state, post.user);
        return {post, author}
    }}
    return {}
  })

  const [formattedCreatedAt, setFormattedCreatedAt] = useState<string>('');
  const [textParts, setTextParts] = useState<string[]>([]);
  const [showCreateReply, setShowCreateReply] = useState(false);

  useEffect(() => {
    if (post) {
      if (post.text) {
        setTextParts(post.text.replace(/ /g, ", ").split(','));
      }
      if (post.createdAt) {
        setFormattedCreatedAt(formatPostDate(new Date(post.createdAt)))
      }
      // if (showReplies && post._id && !post.replies) {
      //   dispatch(fetchPostReplies(post._id));
      // }
    }
  }, [post])

  const handleLikeButton = useCallback(() => {
    if (id) {
      dispatch(likePostAction(id));
    }
  }, [id])

  const onClickNavigateToPost = useCallback(() => post && navigate(`/post/${post._id}`), [navigate, post])

  const handleReplyButton = useCallback(() => {
    setShowCreateReply(!showCreateReply);
  }, [showCreateReply])

  const handleRepostButton = useCallback(() => {
    if (id){
      dispatch(repostPostAction(id));
    }
  }, [id])

  const handleDeletePostButton = useCallback(() => {
    if (post && post.user && authData._id) {
      dispatch(deletePostAction(post._id))
    }
  }, [post, authData])

  if (author && post && post.repostOf) {
    return <blockquote style={{paddingTop: 0}}>
      <span style={{paddingRight: '0.5rem', fontSize: '0.8em', lineHeight: '0.7'}}>{author.username} reposted</span>
      <RepostIcon width='16px' height='16px' style={{verticalAlign: 'middle'}} />
      <Post id={post.repostOf} />
    </blockquote>
  }

  return ( post && author ? <div className={style.PostContainer}>
      <div className={style['PostContainer__avatar-container']}>
        <Link to={`/user/${author.username}`}>
          <Avatar username={author?.username} imageId={author?.imageId || ''} height={'48px'} width={'48px'}/>
        </Link>
      </div>
      <div className={style.PostContainer__content}>
          <div className={style.PostContainer__header}>
            <Link to={`/user/${author.username}`} className={style["PostContainer__header-link-container"]}>
              <span className={style["PostContainer__header-username"]}>{author.username}</span>
            <h6 className={style['PostContainer__header-date']}>{formattedCreatedAt}</h6>
            </Link>
            {post?.user === authData._id &&
            <Popup
              trigger={
                <div className={style["PostContainer__header-popup-container"]}>
                  <DotsIcon  width={'20px'} height={'20px'}/>
                </div>}
              position="bottom right"
            >
                <button onClick={handleDeletePostButton}>Delete Post</button>
            </Popup>}
          </div>
        <div onClick={onClickNavigateToPost} className={style["PostContainer__content-text"]}>
          {post?.text && textParts.map((part, i) => {
            const reUser = part.match(/(?<=\s@)[\S+]*/)
            if (reUser) {
              console.log(reUser[0]);
              return <Link to={`${process.env.BACKEND_URL}static/image/${reUser[0]}`} key={i}>{part}</Link>
            }
            const reUrl = part.match(/\bhttp(s)?:\/\/\S+/);
            if (reUrl) {
              return <a href={part} key={i}>{part}</a>
            }
            return part;
          })}
        </div>
        {post?.imageId && (<div onClick={onClickNavigateToPost} className={style["PostContainer__content-attachment"]}>
          <img
            className={style["PostContainer__content-attachment-image"]}
            src={`${process.env.BACKEND_URL}/static/image/${post?.imageId}`}
            alt={post?.text}
          />
        </div>)}
        <div className={style["PostContainer__content-interaction"]}>

          <button onClick={handleReplyButton} className={style["PostContainer__content-interaction-reply"]}>
            <CommentIcon color='black' width='20px' height='20px'/>
            <span>{post?.replyCount}</span>
          </button>

          <button onClick={handleRepostButton} className={style["PostContainer__content-interaction-repost"]}>
              <RepostIcon width='24px' height='24px' color={post?.hasReposted ? 'blue' : 'black'}/>
              <span>{post?.repostCount}</span>
          </button>

          <button onClick={handleLikeButton} className={style["PostContainer__content-interaction-like"]}>
            <LikeIcon width='20px' height='20px' color={post?.hasLiked ? 'red' : 'black'}/>
            <span>{post?.likeCount}</span>
          </button>
        </div>
        {showCreateReply && <CreatePost replyTo={id} />}
        {(showReplies && id && <PostReplies postId={id} />)}
      </div>
    </div> : <><h3>Loading</h3></>);
});

export const Avatar: React.FC<{username: string, imageId?: string, width?: string, height?: string}> = ({username, imageId, width, height}) => {
  const src = imageId
    ? `${process.env.BACKEND_URL}/static/image/${imageId}`
    : `data:image/svg+xml;utf8,${encodeURIComponent(jdenticon.toSvg(username || 'username', 48))}`
  return <img
    className={style.Avatar}
    alt={'avatar'}
    src={src}
    width={width || undefined}
    height={height || undefined}
    hidden={undefined}
  />}
