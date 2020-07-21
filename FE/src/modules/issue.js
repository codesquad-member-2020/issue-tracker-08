import { handleActions } from "redux-actions";
import createRequestThunk from "@Lib/createRequestThunk";
import * as api from "@Lib/api";

const GET_ISSUE = "issue/GET_ISSUE";
const GET_ISSUE_SUCCESS = "issue/GET_ISSUE_SUCCESS";

const GET_DETAIL_ISSUE = "issue/GET_DETAIL_ISSUE";
const GET_DETAIL_ISSUE_SUCCESS = "issue/GET_DETAIL_ISSUE_SUCCESS";

const CHANGE_ISSUE_STATUS = "issue/CHANGE_ISSUE_STATUS";
const CHANGE_ISSUE_STATUS_SUCCESS = "issue/CHANGE_ISSUE_STATUS_SUCCESS";

const POST_ISSUE = "issue/POST_ISSUE";
const POST_ISSUE_SUCCESS = "issue/POST_ISSUE_SUCCESS";

const PATCH_ISSUE_TITLE = "issue/PATCH_ISSUE_TITLE";

const POST_COMMENT = "issue/POST_COMMENT";

const PUT_COMMENT = "issue/PUT_COMMENT";
const PUT_COMMENT_SUCCESS = "issue/PUT_COMMENT_SUCCESS";

const DELETE_COMMENT = "issue/DELETE_COMMENT";

export const getIssue = createRequestThunk(GET_ISSUE, api.getIssue);
export const getDetailIssue = createRequestThunk(GET_DETAIL_ISSUE, api.getDetailIssue);
export const postIssue = createRequestThunk(POST_ISSUE, api.postIssue);
export const changeIssueStatus = createRequestThunk(CHANGE_ISSUE_STATUS, api.changeIssueStatus);
export const patchIssueTitle = createRequestThunk(PATCH_ISSUE_TITLE, api.patchIssueTitle);
export const postComment = createRequestThunk(POST_COMMENT, api.postComment);
export const putComment = createRequestThunk(PUT_COMMENT, api.putComment);
export const deleteComment = createRequestThunk(DELETE_COMMENT, api.deleteComment);

const initialState = {
  issues: null,
  issueInfo: null,
  detailIssue: null,
  statusCode: null,
};

const issue = handleActions(
  {
    [GET_ISSUE_SUCCESS]: (state, action) => ({
      ...state,
      issues: action.payload.data.issues,
      issueInfo: {
        numberOfLabels: action.payload.data.numberOfLabels,
        numberOfMilestones: action.payload.data.numberOfMilestones,
        numberOfOpenIssue: action.payload.data.numberOfOpenIssue,
        numberOfClosedIssue: action.payload.data.numberOfClosedIssue,
        numberOfPage: action.payload.data.numberOfPage,
      },
    }),
    [GET_DETAIL_ISSUE_SUCCESS]: (state, action) => ({
      ...state,
      detailIssue: action.payload.data,
    }),
    [POST_ISSUE_SUCCESS]: (state, action) => ({
      ...state,
      detailIssue: action.payload.data,
    }),
    [CHANGE_ISSUE_STATUS_SUCCESS]: (state, action) => ({
      ...state,
      statusCode: action.payload.status,
    }),
  },
  initialState
);

export default issue;
