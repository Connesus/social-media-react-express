import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IMessage {
  _id: string;
  sender: string
  receiver: string
  text: string;
  createdAt: Date;
  seen?: Boolean;
}

const messageAdapter = createEntityAdapter<IMessage>({
  selectId: (message) => message._id,
})

export const messageSlice = createSlice({
  name: 'message',
  initialState: messageAdapter.getInitialState(),
  reducers: {
    sendMessage: ((state, action: PayloadAction<{
      receiver: string,
      text: string
    }>) => {
      return;
    })
  }
})

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;
