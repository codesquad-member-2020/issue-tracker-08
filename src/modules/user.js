import { handleActions } from "redux-actions";
import createRequestThunk from "@Lib/createRequestThunk";
import * as api from "@Lib/api";

const POST_USER = "milestone/POST_USER";
const POST_USER_SUCCESS = "milestone/POST_USER_SUCCESS";

export const postUser = createRequestThunk(POST_USER, api.postUser);

const initialState = {
  userMsg: null,
};

const user = handleActions(
  {
    [POST_USER_SUCCESS]: (state, action) => ({
      ...state,
      userMsg: action.payload,
    }),
  },
  initialState
);

export default user;
