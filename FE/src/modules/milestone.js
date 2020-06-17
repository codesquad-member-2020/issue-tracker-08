import { handleActions } from "redux-actions";
import createRequestThunk from "../lib/createRequestThunk";
import * as api from "@Lib/api";

const GET_MILESTONE = "milestone/GET_MILESTONE";
const GET_MILESTONE_SUCCESS = "milestone/GET_MILESTONE_SUCCESS";

export const getMilestone = createRequestThunk(GET_MILESTONE, api.getMilestone);

const initialState = {
  milestones: null,
};

const milestone = handleActions(
  {
    [GET_MILESTONE_SUCCESS]: (state, action) => ({
      ...state,
      milestones: action.payload,
    }),
  },
  initialState
);

export default milestone;
