import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {fetchUserById} from "../redux/slice/users";
import {Avatar} from "./Post";
import style from '../styles/ChatItem.module.scss'
import {useNavigate} from "react-router-dom";

export const ChatItem: React.FC<{id: string}> = ({id}) => {
  const userId = useSelector((state:RootState) => state.auth._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatData = useSelector((state:RootState) => {
    const chat = useSelector((state:RootState) => state.chat.entities[id]);
    if (chat) {
      const chatWithId = chat && (chat.members.filter((member) => member !== userId))[0]
      const chatter =  useSelector((state: RootState) => state.user.entities[chatWithId])
      return {chatWithId, chatter, chat}
    }
    return undefined
  })

  const onClick = useCallback(() => {
    if (chatData && chatData.chatWithId) {
      navigate('/message/' + chatData.chatWithId)
    }
  }, [chatData])

  useEffect(() => {
    if (chatData && chatData.chatWithId && !chatData.chatter) {
      dispatch(fetchUserById(chatData.chatWithId));
    }
  }, [chatData])

  return (
    <>
    {chatData && chatData.chatter && chatData.chat
      ? (
        <blockquote className={style.ChatItem} key={id} onClick={onClick}>
          <Avatar username={chatData.chatter.username} imageId={chatData.chatter.imageId} />
          <h4 style={{margin:0, paddingLeft:"20px"}}>{chatData.chatter.username}</h4>
          <span style={{margin:0, padding:'20px', textOverflow:"ellipsis" }}>{chatData.chat.messages[0].text}</span>
        </blockquote>
      )
      : <>loading</>}
      </>
  )
}
