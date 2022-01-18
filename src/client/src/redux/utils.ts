import {ActionCreatorWithPayload, createAction, EnhancedStore} from "@reduxjs/toolkit";
import {STATUS} from "./slice/requests";
import { Middleware } from 'redux'
import {io, Socket} from 'socket.io-client';
import {chatActions, IMessage} from './slice/chat';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {fetchAllChatMessages} from "./slice/users";
import {SubMiddlewareApi} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types.js";

enum ChatEvent {
  SendMessage = 'send_message',
  RequestAllMessages = 'request_all_messages',
  SendAllMessages = 'send_all_messages',
  ReceiveMessage = 'receive_message'
}

export type FetchChatsResponse = {
  _id: {sender: string, receiver: string},
  lastMessage: IMessage
}

// type createRequestActionT<R extends unknown, S extends unknown, E extends unknown> = (type: string) => {
//   Request: ActionCreatorWithPayload<R>;
//   Success: ActionCreatorWithPayload<S>;
//   Error: ActionCreatorWithPayload<E>;
// }

// var wrapFunction = function(fn: Function, context: ThisType<any>, params: any[]) {
//   return function() {
//     fn.apply(context, params);
//   };
// }

type socketMiddlewareFn = (
  action: PayloadAction<any>,
  socket: Socket,
  store: SubMiddlewareApi
) => void

export const createRequestAction = (type: string) => ({
  Request: createAction<string>(type + STATUS.REQUEST),
  Success: createAction<string>(type + STATUS.SUCCESS),
  Error: createAction<{id: string, error?: string}>(type + STATUS.ERROR)
})

const fetchAllChatMessagesSocketFn: socketMiddlewareFn =
  function(action, socket,store) {
    console.log('fetchAllChatMessages')
    socket.emit('fetchAllChatMessages', action.payload, (messages: IMessage[]) => {
    // console.log('messaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaages', messages)
    messages.forEach(message => {
      store.dispatch(chatActions.addMessage(message))
    })
  })
}

const fetchAllChatsSocketFn: socketMiddlewareFn =
  function(action, socket,store) {
  console.log('fetchAllChats')
  socket.emit('fetchAllChats', action.payload, (chats: FetchChatsResponse[]) => {
    store.dispatch(chatActions.addChats(chats))
  })

}

const sendMessageSocketFn: socketMiddlewareFn =
  function (action, socket,store) {
    console.log('send mesage')
    socket.emit('sendMessage', action.payload, (data: IMessage) => {
      store.dispatch(chatActions.addMessage(data))
    })
  }



export const chatMiddleware: Middleware = store => {
  let socket: Socket;
  let fnQueue: Array<Partial<socketMiddlewareFn>> = [];

  return next => action => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;

    if (chatActions.startConnecting.match(action)) {
      socket = io(process.env.BACKEND_URL as string, {
        withCredentials: true,
        path: '/sckt'
      });

      socket.on('connect', () => {
        store.dispatch(chatActions.connectionEstablished())

        while (fnQueue.length > 0) {
          // @ts-ignore
          (fnQueue.shift())(socket, store);
        }
      });

      socket.on('disconnect', () => {
        store.dispatch(chatActions.socketDisconnect())
      });

      socket.on('receiveMessage', (payload) => {
        store.dispatch(chatActions.addMessage(payload))
      })
    }

    if (chatActions.sendMessage.match(action as PayloadAction)) {
      if (isConnectionEstablished) {
        sendMessageSocketFn(action, socket,store);
      }
      fnQueue.push(sendMessageSocketFn.bind(null, action))
    }

    if (chatActions.fetchAllChats.match(action)) {
      console.log('fetchall chats')
      if (isConnectionEstablished) {
        fetchAllChatsSocketFn(action, socket,store);
      }
      console.log('fetchall chats')
      fnQueue.push(fetchAllChatsSocketFn.bind(null, action))
    }
    console.log(action)
    if (fetchAllChatMessages.match(action)) {
      if (isConnectionEstablished) {
        fetchAllChatMessagesSocketFn(action, socket,store);
      }
      console.log('fetchall chats')

      fnQueue.push(fetchAllChatMessagesSocketFn.bind(null, action))
    }

    next(action);
  }
}
