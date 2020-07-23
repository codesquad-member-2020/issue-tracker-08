import createRequestThunk from "@Lib/createRequestThunk";
import * as api from "@Lib/api";

const SAVE_OPTION = "option/SAVE_OPTION";
const RESET_OPTION = "option/RESET_OPTION";
// const MAKE_MSG = "option/MAKE_MSG";
const SAVE_ASSIGNEES = "option/SAVE_ASSIGNEES";
const SAVE_LABELS = "option/SAVE_LABELS";
const SAVE_MILESTONE = "option/SAVE_MILESTONE";

export const saveOption = (data, title) => ({ type: SAVE_OPTION, data, title });
export const resetOption = () => ({ type: RESET_OPTION });
// export const makeMsg = (data, title) => ({ type: MAKE_MSG, data, title });

export const saveAssignees = createRequestThunk(SAVE_ASSIGNEES, api.changeAssignee);
export const saveLabels = createRequestThunk(SAVE_LABELS, api.changeLabels);
export const saveMilestone = createRequestThunk(SAVE_MILESTONE, api.changeMilestone);

const initialState = {
  author: null,
  assignees: [],
  labels: [],
  milestoneId: null,
  is: null,
  // msg: "",
};

const titleMap = {
  Author: "author",
  Assignees: "assignees",
  Labels: "labels",
  Milestone: "milestoneId",
};

const option = (state = initialState, action) => {
  const { type, data, title } = action;

  switch (type) {
    case SAVE_OPTION:
      return { ...state, [titleMap[title]]: data };
    case RESET_OPTION:
      return { ...initialState };
    // case MAKE_MSG:
    //   return { ...state, msg: msg.concat(' ', `${title}:${data}`) };
    default:
      return state;
  }
};

export default option;
