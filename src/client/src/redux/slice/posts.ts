import {createAction, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPost} from "@shared/types";
import {createRequestAction} from "../utils";
import {RootState} from "../store";



const postAdapter = createEntityAdapter<IPost>({
  selectId: model => model._id
})

interface additionalState {
  feedIds: string[],
  profileIds: string[],
  searchIds: string[]
}

export const userSlice = createSlice({
  name: 'post',
  initialState: postAdapter.getInitialState<additionalState>({
    feedIds: [],
    profileIds: [],
    searchIds: [],
  }),
  reducers: {
    setSearchIds: ((state, action) => {
      state.searchIds = action.payload
    }),
    setPost: postAdapter.setOne,
    setManyPosts: postAdapter.setMany,
    upsertManyPosts: postAdapter.upsertMany,
    addToFeed: ((state, action: PayloadAction<string[]>) => ({...state, feedIds: [...state.feedIds, ...action.payload]})),
    addToProfileIds:  ((state, action: PayloadAction<string[]>) => ({...state, profileIds: [...state.profileIds, ...action.payload]})),
    clearProfileIds: (state) => ({...state, profileIds: []}),
    deleteOnePost: ((state, action:PayloadAction<string>) => {
      postAdapter.removeOne(state, action.payload);
      state.feedIds = state.feedIds.filter(feedId => feedId !== action.payload);
      state.profileIds = state.profileIds.filter(profileId => profileId !== action.payload);
    })
  }
})

export const {setPost, setManyPosts, addToFeed, setSearchIds, addToProfileIds, upsertManyPosts, clearProfileIds, deleteOnePost} = userSlice.actions;

export const fetchPostById = createAction<{postId: string, reqId: string}>('fetchPostById');
export const fetchMoreFeedPosts = createAction<string | undefined>('fetchMoreFeedPosts');
export const likePostAction = createAction<string>('likePostAction');
export const fetchProfilePostIds = createAction<string>('fetchProfilePostIds');
export const createPostAction = createAction<FormData>('createPostAction');
export const replyToPostAction = createAction<FormData>('replyToPostAction');
export const fetchPostReplies = createAction<string>('fetchPostReplies');
export const deletePostAction = createAction<string>('deletePostAction');
export const repostPostAction = createAction<string>('repostPostAction');
export const searchPosts = createAction<string>('searchPosts');


export const fetchMoreFeedPostsRequestActions =
  createRequestAction(fetchMoreFeedPosts.type);
export const fetchPostByIdRequestActions =
  createRequestAction(fetchPostById.type);

export const selectPostState = postAdapter.getSelectors((state: RootState) => state.post);
export const selectFeedIds = (state: RootState) => state.post.feedIds;
export const selectProfileIds = (state: RootState) => state.post.profileIds;

export default userSlice.reducer;
