import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {IUser} from "@shared/types";
import {RootState} from "../store.js";



const userAdapter = createEntityAdapter<IUser>({
  selectId: model => model._id
})

export const userSlice = createSlice({
  name: 'user',
  initialState: userAdapter.getInitialState(),
  reducers: {
    setUser: userAdapter.setOne,
    setManyUsers: userAdapter.setMany
  }
})

export const {setManyUsers, setUser} = userSlice.actions;
export default userSlice.reducer;
export const selectUserState = userAdapter.getSelectors((state: RootState) => state.user);
