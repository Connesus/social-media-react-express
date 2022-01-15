import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser, SessionUserT, UserLoginDataT} from "@shared/types";
import {useSelector} from "react-redux";
import {RootState} from "../store.js";


export interface AuthState extends IUser {
  role: 'guest' | 'user' | 'admin';
}

const initialState: AuthState = {
  role: "guest",
  _id: '',
  username: '',
  createdAt: new Date()
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginData: ((state, {payload}:PayloadAction<AuthState>) => {
      console.log(payload)
      return {...payload}
    })
  }
})

export const loginUser = createAction<UserLoginDataT>('loginUser');
export const createUser = createAction<UserLoginDataT>('createUser');
export const fetchSessionData = createAction('fetchSessionData');

export const selectAuthState = ((state:RootState) => state.auth);
export const selectIsLoggedIn = ((state: RootState) => selectAuthState(state).role === ('user' || 'admin') )

export const {setLoginData} = authSlice.actions
export default authSlice.reducer
