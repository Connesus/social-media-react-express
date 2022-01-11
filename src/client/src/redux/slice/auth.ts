import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SessionUserT, UserLoginDataT} from "@shared/types";
import {useSelector} from "react-redux";
import {RootState} from "../store.js";


export interface AuthState {
  role: 'guest' | 'user' | 'admin';
  username: string;
  id: string;
}

const initialState: AuthState = {
  role: "guest",
  id: '',
  username: ''
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
