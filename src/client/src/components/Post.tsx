import * as React from "react";
import style from '../styles/Post.module.scss';
import {IPost} from "@shared/types";
import {Link} from "react-router-dom";
import jdenticon from "jdenticon/standalone";
import {useEffect, useState} from "react";
import {RepostIcon} from "./icons/RepostIcon";
import {LikeIcon} from "./icons/LikeIcon";
import {CommentIcon} from "./icons/CommentIcon";

export const Post: React.FC<IPost> = (
  {_id, text, imageId, author, createdAt, counter, user}
  ) => {
  const [textParts, setTextParts] = useState<string[]>([]);

  useEffect(() => {
    if (text) {
      setTextParts(text.replace(/ /g, ", ").split(','));
    }
  }, [text])

  console.log('AUTHOR', author)


  const date = new Date(createdAt);
  const dateStr = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

  return _id ? (
    <div className={style.PostContainer}>
      <div className={style['PostContainer__avatar-container']}>
        <Link to={`/profile/${author.username}`}>
        <Avatar username={author?.username} imageId={author?.imageId || ''} height={'48px'} width={'48px'}/>
        </Link>
      </div>
      <div className={style.PostContainer__content}>
        <div className={style.PostContainer__header}>
          <Link to={`/profile/${author.username}`} className={style["PostContainer__header-username"]}>
            {author.username}
          </Link>
          <h6 className={style['PostContainer__header-date']}>{dateStr}</h6>
        </div>
        <div className={style["PostContainer__content-text"]}>
        {text && textParts.map((part, i) => {
          const reUser = part.match(/(?<=\s@)[\S+]*/)
          if (reUser) {
            console.log(reUser[0]);
            return <Link to={`http://localhost:8081/static/image/${reUser[0]}`} key={i}>{part}</Link>
          }
          const reUrl = part.match(/\bhttp(s)?:\/\/\S+/);
          if (reUrl) {
            return <a href={part} key={i}>{part}</a>
          }
          return part;
        })}
        </div>
        {imageId && (<div className={style["PostContainer__content-attachment"]}>
          <img
            className={style["PostContainer__content-attachment-image"]}
            src={`http://localhost:8081/static/image/${imageId}`}
            alt={text}
          />
        </div>)}
        <div className={style["PostContainer__content-interaction"]}>
          <div className={style["PostContainer__content-interaction-reply"]}>
            <CommentIcon color='black' width='20px' height='20px' />
            <span>{counter.replyCount}</span>
          </div>
          <div className={style["PostContainer__content-interaction-repost"]}>
            <RepostIcon width='24px' height='24px' color={user.hasReposted ? 'blue' : 'black'} />
            <span>{counter.repostCount}</span>
          </div>
          <div className={style["PostContainer__content-interaction-like"]}>
            <LikeIcon width='20px' height='20px' color={user.hasReposted ? 'red' : 'black'}/>
            <span>{counter.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  ) : <h3>Loading</h3>;
};

const Avatar: React.FC<{username: string, imageId: string, width?: string, height?: string}> = ({username, imageId, width, height}) => {
  const src = imageId
    ? `http://localhost:8081/static/image/${imageId}`
    : `data:image/svg+xml;utf8,${encodeURIComponent(jdenticon.toSvg(username || 'username', 48))}`
  return <img
    className={style.Avatar}
    alt={'avatar'}
    src={src}
    width={width || undefined}
    height={height || undefined}
    hidden={undefined}
  />}
