import createRequestThunk from "@Lib/createRequestThunk";
import * as api from "@Lib/api";

const SAVE_OPTION = "option/SAVE_OPTION";
const RESET_OPTION = "option/RESET_OPTION";
const SAVE_QUERY = "option/SAVE_QUERY";

const SAVE_ASSIGNEES = "option/SAVE_ASSIGNEES";
const SAVE_LABELS = "option/SAVE_LABELS";
const SAVE_MILESTONE = "option/SAVE_MILESTONE";

export const saveOption = (data, title) => ({ type: SAVE_OPTION, data, title });
export const resetOption = () => ({ type: RESET_OPTION });
export const saveQuery = (data) => ({ type: SAVE_QUERY, data });

export const saveAssignees = createRequestThunk(SAVE_ASSIGNEES, api.changeAssignee);
export const saveLabels = createRequestThunk(SAVE_LABELS, api.changeLabels);
export const saveMilestone = createRequestThunk(SAVE_MILESTONE, api.changeMilestone);

const initialState = {
  author: null,
  assignees: [],
  labels: [],
  milestoneId: null,
  is: null,
  queryParams: {
    isOpen: true,
    author: null,
    label: null,
    milestone: null,
    assignee: null,
    sort: null,
    page: 1,
  },
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
      return { ...state, author: null, assignees: [], labels: [], milestoneId: null, is: null };
    case SAVE_QUERY:
      return {
        ...state,
        queryParams: {
          // ...state.queryParams,
          isOpen: data.isOpen ? data.isOpen : state.queryParams.isOpen,
          author: data.author ? data.author : state.queryParams.author,
          label: data.label ? data.label : state.queryParams.label,
          milestone: data.milestone ? data.milestone : state.queryParams.milestone,
          assignee: data.assignee ? data.assignee : state.queryParams.assignee,
          sort: data.sortStr ? data.sortStr : state.queryParams.sort,
          page: data.page ? data.page : state.queryParams.page,
        },
      };
    default:
      return state;
  }
};

export default option;
