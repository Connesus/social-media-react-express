import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from './sagas/rootSaga'

import requestReducer from './slice/requests'
import authReducer from './slice/auth'
import postReducer from './slice/posts'
import userReducer from './slice/users'
import chatReducer from './slice/chat'
import {chatMiddleware} from "./utils";

const sagaMiddleware = createSagaMiddleware()


export const store = configureStore({
    reducer: {
        post: postReducer,
        request: requestReducer,
        auth: authReducer,
        user: userReducer,
        chat: chatReducer,
    },
    middleware: [sagaMiddleware, chatMiddleware],
    devTools: true
})


sagaMiddleware.run(watcherSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
