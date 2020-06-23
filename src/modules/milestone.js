import { handleActions } from "redux-actions";
import createRequestThunk from "@Lib/createRequestThunk";
import * as api from "@Lib/api";

const GET_MILESTONE = "milestone/GET_MILESTONE";
const GET_MILESTONE_SUCCESS = "milestone/GET_MILESTONE_SUCCESS";

const GET_MILESTONE_DETAIL = "milestone/GET_MILESTONE_DETAIL";
const GET_MILESTONE_DETAIL_SUCCESS = "milestone/GET_MILESTONE_DETAIL_SUCCESS";

const POST_MILESTONE = "milestone/POST_MILESTONE";
const PUT_MILESTONE = "milestone/PUT_MILESTONE";
const PATCH_MILESTONE = "milestone/PATCH_MILESTONE";
const DELETE_MILESTONE = "milestone/DELETE_MILESTONE";

export const getMilestone = createRequestThunk(GET_MILESTONE, api.getMilestone);
export const getMilestoneDetail = createRequestThunk(GET_MILESTONE_DETAIL, api.getMilestoneDetail);
export const postMilestone = createRequestThunk(POST_MILESTONE, api.postMilestone);
export const putMilestone = createRequestThunk(PUT_MILESTONE, api.putMilestone);
export const patchMilestone = createRequestThunk(PATCH_MILESTONE, api.patchMilestone);
export const deleteMilestone = createRequestThunk(DELETE_MILESTONE, api.deleteMilestone);

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
    [GET_MILESTONE_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      milestoneDetail: action.payload,
    }),
  },
  initialState
);

export default milestone;
