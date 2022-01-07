import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user'
import postReducer from './slice/post'
import requestReducer from './slice/request'
import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()


export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        request: requestReducer
    },
    middleware: [sagaMiddleware],
    devTools: true
})


sagaMiddleware.run(watcherSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
