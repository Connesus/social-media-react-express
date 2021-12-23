import { SessionUserT } from '@backend/utils/helpers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginDataT } from '../sagas/requests/user';

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

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<LoginDataT>) => { },
        createUser: (state, action) => { },
        getSessionData: (state, action: PayloadAction<undefined>) => { },
        setSessionData: (state, action: PayloadAction<SessionUserT>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
        },
        setUsername: (state, action) => {
            console.log(action)

            state.username = action.payload
        },
        setLoginStatus: (state, action) => {
            console.log(action)
            state.isLoggedIn = action.payload
            // return { ...state, ...action.payload }
        },
        setUserId: (state, action) => {
            console.log(action)

            state.id = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserId, setUsername, setLoginStatus, createUser, loginUser, getSessionData, setSessionData } = userSlice.actions

export default userSlice.reducer