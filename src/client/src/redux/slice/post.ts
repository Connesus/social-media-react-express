import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPost} from "@shared/types";

export interface PostState {
    postFeed: IPost[],
    currentPost: IPost | undefined;
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
        addPostsToFeed: (state, action: PayloadAction<IPost[]>) => {
            state.postFeed = action.payload;
        },
        setCurrentPost: (state, action: PayloadAction<IPost>) => {
            state.currentPost = action.payload;
        }
    }
})

export const { addPostsToFeed, loadMorePosts, getPostById, setCurrentPost } = postSlice.actions;
// @ts-ignore
export default postSlice.reducer;
