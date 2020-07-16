const SAVE_OPTION = "option/SAVE_OPTION";
const SAVE_LABELS = "option/SAVE_LABELS";
const SAVE_MILESTONE = "option/SAVE_MILESTONE";
const RESET_OPTION = "option/RESET_OPTION";

export const saveOption = (data, title) => ({ type: SAVE_OPTION, data, title });
export const saveLabels = (data) => ({ type: SAVE_LABELS, data });
export const saveMilestone = (data) => ({ type: SAVE_MILESTONE, data });
export const resetOption = () => ({ type: RESET_OPTION });

const initialState = {
  author: null,
  assignees: [],
  labels: [],
  milestoneId: null,
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
    default:
      return state;
  }
};

export default option;
