import { handleActions } from "redux-actions";
import createRequestThunk from "../lib/createRequestThunk";
import * as api from "@Lib/api";

const GET_ISSUE = "issue/GET_ISSUE";
const GET_ISSUE_SUCCESS = "issue/GET_ISSUE_SUCCESS";

export const getIssue = createRequestThunk(GET_ISSUE, api.getIssue);

const initialState = {
  issues: null,
};

const issue = handleActions(
  {
    [GET_ISSUE_SUCCESS]: (state, action) => ({
      ...state,
      issues: action.payload,
    }),
  },
  initialState
);

export default issue;
