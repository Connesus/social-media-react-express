import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {chatActions} from "../redux/slice/chat";
import {RootState} from "../redux/store";
import {ChatItem} from "./ChatItem";


export const MessagesPage: React.FC = () => {
  const dispatch = useDispatch();
  const chatIds = useSelector((state: RootState) => state.chat.ids);

  useEffect(() => {
    dispatch(chatActions.startConnecting());
    dispatch(chatActions.fetchAllChats());
    // dispatch(chatActions.sendMessage({receiver: "61e18e7cb865ccb719762b69", text: 'rauul'}))

  }, [])

  return (
    <div style={{width:'100%'}}>
      {chatIds
        ? chatIds.map(id => <ChatItem id={String(id)} />)
        : <span>Loading</span>}
    </div>
  )
}
