import React, {useCallback, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {fetchAllChatMessages} from "../redux/slice/users";
import {RootState} from "../redux/store";
import {chatActions, IMessage} from "../redux/slice/chat";

export const ChatPage: React.FC = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth._id);
  const chatId = [id, userId].sort().join('')
  const chat = useSelector((state:RootState) => state.chat.entities[chatId], shallowEqual);


  useEffect(() => {
    if (id) {
      console.log('fetchAllChatMessages')
      dispatch(fetchAllChatMessages(id))
    }
  }, [id])

  const postTextRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = useCallback(() => {
    console.log('message')
    if (id && postTextRef?.current?.value) {
    dispatch(chatActions.sendMessage({receiver: id, text: postTextRef.current.value}))
    }
  }, [])

  return (
    <div style={{
      flex:"1",
      flexDirection:"column",
      justifyContent:"end",alignItems:"end",
      overflow:"auto"
    }}>
      <div>
        <textarea ref={postTextRef}></textarea>
        <button onClick={handleSendMessage}>Send</button>
      </div>
      {chat && chat.messages.map((message: IMessage) =>
        <blockquote key={message._id}>
          {console.log('________id', message._id)}
          {/*<strong>{allUsers[message.sender]}</strong>*/}
          {message.text}
        </blockquote>)}
    </div>
  )
}
