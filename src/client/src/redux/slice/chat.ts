import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";
import {FetchChatsResponse} from "../utils.js";

export interface IChat {
  chatWith: string;
  members: string[];
  messages: IMessage[];
}

export interface IMessage {
  _id: string;
  sender: string
  receiver: string
  text: string;
  createdAt: Date;
  seen?: Boolean;
}

const chatAdapter = createEntityAdapter<IChat>({
  selectId: (chat) => chat.members.sort().join(''),
  sortComparer: (a, b) => {
    if (!a.messages[0] || a.messages[0].createdAt <= b.messages[0].createdAt ) {
      return -1
    } else {
      return 1
    }
  }
})


// const initialState: ChatState = {
//   isEstablishingConnection: false,
//   isConnected: false
// };

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatAdapter.getInitialState({
    isEstablishingConnection: false,
    isConnected: false
  }),
  reducers: {
    startConnecting: (state => {
      state.isEstablishingConnection = true;
    }),
    connectionEstablished: (state => {
      state.isConnected = true;
      state.isEstablishingConnection = false;
    }),
    socketDisconnect: (state => {
      state.isConnected = false;
      state.isEstablishingConnection = false;
    }),
    sendMessage: ((state, action: PayloadAction<{
      receiver: string,
      text: string
    }>) => {return;}),
    addMessage: ((state, {payload}: PayloadAction<IMessage>) => {
      console.log('addMessage')
      const {receiver, sender} = payload
      const chatWith = [receiver, sender].sort().join('');
      const chat = state.entities[chatWith];
      if (chat) {
        const chatMessages = chat.messages.filter(message => message._id !== payload._id)

        const updatedMessages = [payload, ...chatMessages]
            .sort((a, b) => a.createdAt >= b.createdAt ? -1 : 1);
          chatAdapter.setOne(state, {chatWith,members: [receiver, sender], messages: updatedMessages})
      } else {
        chatAdapter.setOne(state, {chatWith,members: [receiver, sender] ,messages: [payload]})
      }
    }),
    fetchAllChats: (state => {return;}),
    addChats: ((state, {payload}: PayloadAction<FetchChatsResponse[]>) => {
      console.log('addChats')
      payload.forEach(({_id, lastMessage}) => {
        const chatWith = [_id.receiver, _id.sender].sort().join('');
        const chat = state.entities[chatWith];
        if (chat) {
          const chatMessages = chat.messages.filter(message => message._id !== lastMessage._id)
          const updatedMessages = [lastMessage, ...chatMessages]
            .sort((a, b) => a.createdAt >= b.createdAt ? -1 : 1);
          chatAdapter.setOne(state, {
            chatWith,
            members: [_id.receiver, _id.sender],
            messages: updatedMessages
          })
        } else {
          chatAdapter.setOne(state, {
            chatWith,
            members: [_id.receiver, _id.sender],
            messages: [lastMessage]
          })
        }
      })
    })
  },
});


const simpleSelectors = chatAdapter.getSelectors();
const globalizedSelectors = chatAdapter.getSelectors((state:RootState) => state.chat);

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
