import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counter'
import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()


export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(watcherSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch