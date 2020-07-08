import { handleActions } from "redux-actions";
import createRequestThunk from "@Lib/createRequestThunk";
import * as api from "@Lib/api";

const GET_ISSUE = "issue/GET_ISSUE";
const GET_ISSUE_SUCCESS = "issue/GET_ISSUE_SUCCESS";

const GET_DETAIL_ISSUE = "issue/GET_DETAIL_ISSUE";
const GET_DETAIL_ISSUE_SUCCESS = "issue/GET_DETAIL_ISSUE_SUCCESS";

export const getIssue = createRequestThunk(GET_ISSUE, api.getIssue);
export const getDetailIssue = createRequestThunk(GET_DETAIL_ISSUE, api.getDetailIssue);

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
  },
  initialState
);

export default issue;
