import { handleActions } from "redux-actions";
import createRequestThunk from "../lib/createRequestThunk";
import * as api from "@Lib/api";

const GET_MILESTONE = "milestone/GET_MILESTONE";
const GET_MILESTONE_SUCCESS = "milestone/GET_MILESTONE_SUCCESS";

const GET_MILESTONE_DETAIL = "milestone/GET_MILESTONE_DETAIL";
const GET_MILESTONE_DETAIL_SUCCESS = "milestone/GET_MILESTONE_DETAIL_SUCCESS";

export const getMilestone = createRequestThunk(GET_MILESTONE, api.getMilestone);
export const getMilestoneDetail = createRequestThunk(GET_MILESTONE_DETAIL, api.getMilestoneDetail);

const initialState = {
  milestones: null,
  milestoneDetail: null,
};

const milestone = handleActions(
  {
    [GET_MILESTONE_SUCCESS]: (state, action) => ({
      ...state,
      milestones: action.payload,
    }),
  },
  {
    [GET_MILESTONE_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      milestoneDetail: action.payload,
    }),
  },
  initialState
);

export default milestone;
