import { handleActions } from "redux-actions";
import createRequestThunk from "@Lib/createRequestThunk";
import * as api from "@Lib/api";

const POST_USER = "user/POST_USER";
const POST_USER_SUCCESS = "user/POST_USER_SUCCESS";

const POST_LOGIN = "user/POST_LOGIN";
const POST_LOGIN_SUCCESS = "user/POST_LOGIN_SUCCESS";

export const postUser = createRequestThunk(POST_USER, api.postUser);
export const postLogin = createRequestThunk(POST_LOGIN, api.postLogin);

const initialState = {
  userMsg: null,
};

const user = handleActions(
  {
    [POST_USER_SUCCESS]: (state, action) => ({
      ...state,
      userMsg: action.payload.status,
    }),
    [POST_LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      userMsg: action.payload.status,
    }),
  },
  initialState
);

export default user;
