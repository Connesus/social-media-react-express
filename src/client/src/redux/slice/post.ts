import { IPostDefinitions } from '@backend/model/post';
import {ActionCreatorWithoutPayload, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface PostState {
    postFeed: IPostDefinitions[],
    currentPost: IPostDefinitions | undefined
}

const initialState: PostState = {
    postFeed: [],
    currentPost: undefined,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPostById: (state, action: PayloadAction<string>) => {},
        loadMorePosts: (state, action: PayloadAction<undefined>) => {
            console.log('Loading more posts');
        },
        // @ts-ignore
        addPostsToFeed: (state, action: PayloadAction<IPostDefinitions[]>) => ({
            // @ts-ignore
            postFeed: [...state.postFeed, ...action.payload]
        }),
        // setCurrentPost: (state, action: PayloadAction<undefined>)
    }
})

export const { addPostsToFeed, loadMorePosts, getPostById } = postSlice.actions;
export default postSlice.reducer;
