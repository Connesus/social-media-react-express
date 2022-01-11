import {ActionCreatorWithPayload, createAction} from "@reduxjs/toolkit";
import {STATUS} from "./slice/requests";

// type createRequestActionT<R extends unknown, S extends unknown, E extends unknown> = (type: string) => {
//   Request: ActionCreatorWithPayload<R>;
//   Success: ActionCreatorWithPayload<S>;
//   Error: ActionCreatorWithPayload<E>;
// }

export const createRequestAction = (type: string) => ({
  Request: createAction<string>(type + STATUS.REQUEST),
  Success: createAction<string>(type + STATUS.SUCCESS),
  Error: createAction<{id: string, error?: string}>(type + STATUS.ERROR)
})
