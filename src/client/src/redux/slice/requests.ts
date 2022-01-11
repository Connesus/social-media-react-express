import {Action, createAction, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AnyAction} from '@reduxjs/toolkit'
import {RejectedAction} from "@reduxjs/toolkit/dist/query/core/buildThunks.js";
import {RootState} from "../store";

export enum STATUS {
  SUCCESS = 'Success',
  ERROR = 'Error',
  REQUEST =  'Request',
  IDLE = 'Idle'
}

export interface RequestState {
  [id: string]: RequestStatus
}

export interface RequestStatus {
  id: string;
  status: STATUS.ERROR | STATUS.SUCCESS | STATUS.REQUEST | STATUS.IDLE;
  error?: string;
}

interface RequestAction extends PayloadAction<RequestStatus> {}

type RequestPayload = string;
type SuccessPayload = string;
type FailPayload = {id: string; error: string}

const isStartingRequestAction = (action: AnyAction): action is PayloadAction<SuccessPayload> => action.type.endsWith(STATUS.REQUEST);
const isSuccessfulRequestAction = (action: AnyAction): action is PayloadAction<RequestPayload> => action.type.endsWith(STATUS.SUCCESS);
const isFailedRequestAction = (action: AnyAction): action is PayloadAction<FailPayload> => action.type.endsWith(STATUS.ERROR);
export const requestStatusCreator = ({id, status = STATUS.IDLE, error}: RequestStatus): RequestStatus => ({id, status, error})

// export const GET_POST_BY_ID_REQUEST = createAction<RequestPayload>('GET_POST_BY_ID_REQUEST');
// export const GET_POST_BY_ID_SUCCESS = createAction<SuccessPayload>('GET_POST_BY_ID_SUCCESS');
// export const GET_POST_BY_ID_FAIL = createAction<FailPayload>('GET_POST_BY_ID_ERROR');

const requestAdapter = createEntityAdapter<RequestStatus>()

export const requestSlice = createSlice({
  name: 'request',
  initialState: requestAdapter.getInitialState(),
  reducers: {
    requestAdded: requestAdapter.addOne
  },
  extraReducers: builder => {
    builder
      .addMatcher(isStartingRequestAction, (state, action) =>
        requestAdapter.setOne(state, {status: STATUS.REQUEST, id: action.payload}))
      .addMatcher(isSuccessfulRequestAction, ((state,action) =>
        requestAdapter.updateOne(state, {id: action.payload, changes: {status: STATUS.SUCCESS}})
      )).addMatcher(isFailedRequestAction, ((state,{payload}) =>
      requestAdapter.updateOne(state, {id: payload.id, changes: {status: STATUS.ERROR, error: payload.error}})
    ))
  }
})

export default requestSlice.reducer;
export const {requestAdded} = requestSlice.actions;

export const selectRequestsState = requestAdapter.getSelectors((state: RootState) => state.request)
