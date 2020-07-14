import { handleActions } from "redux-actions";
import createRequestThunk from "@Lib/createRequestThunk";
import * as api from "@Lib/api";

const GET_ISSUE = "issue/GET_ISSUE";
const GET_ISSUE_SUCCESS = "issue/GET_ISSUE_SUCCESS";

const GET_DETAIL_ISSUE = "issue/GET_DETAIL_ISSUE";
const GET_DETAIL_ISSUE_SUCCESS = "issue/GET_DETAIL_ISSUE_SUCCESS";

const POST_ISSUE = "issue/POST_ISSUE";
const POST_ISSUE_SUCCESS = "issue/POST_ISSUE_SUCCESS";

const POST_COMMENT = "issue/POST_COMMENT";

const PUT_COMMENT = "issue/PUT_COMMENT";
const PUT_COMMENT_SUCCESS = "issue/PUT_COMMENT_SUCCESS";

const DELETE_COMMENT = "issue/DELETE_COMMENT";

export const getIssue = createRequestThunk(GET_ISSUE, api.getIssue);
export const getDetailIssue = createRequestThunk(GET_DETAIL_ISSUE, api.getDetailIssue);
export const postIssue = createRequestThunk(POST_ISSUE, api.postIssue);
export const postComment = createRequestThunk(POST_COMMENT, api.postComment);
export const putComment = createRequestThunk(PUT_COMMENT, api.putComment);
export const deleteComment = createRequestThunk(DELETE_COMMENT, api.deleteComment);

const initialState = {
  issues: null,
  detailIssue: null,
};

const issue = handleActions(
  {
    [GET_ISSUE_SUCCESS]: (state, action) => ({
      ...state,
      issues: action.payload.data.issues,
    }),
    [GET_DETAIL_ISSUE_SUCCESS]: (state, action) => ({
      ...state,
      detailIssue: action.payload.data,
    }),
    [POST_ISSUE_SUCCESS]: (state, action) => ({
      ...state,
      detailIssue: action.payload.data,
    }),
  },
  initialState
);

export default issue;
