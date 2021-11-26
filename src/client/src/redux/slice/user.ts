import { SessionUserT } from './../../../../server/src/utils/helpers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    username: string,
    isLoggedIn: boolean,
    id: string,
}

const initialState: UserState = {
    username: '',
    isLoggedIn: false,
    id: '',
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => { },
        createUser: (state, action) => { },
        getSessionData: () => { },
        setSessionData: (state, action: PayloadAction<SessionUserT>) => {
            return { ...state, ...action.payload }
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUserId: (state, action) => {
            state.id = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserId, setUsername, setLoginStatus, createUser, loginUser, getSessionData, setSessionData } = counterSlice.actions

export default counterSlice.reducer