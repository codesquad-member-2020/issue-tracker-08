import { handleActions } from "redux-actions";
import createRequestThunk from "@Lib/createRequestThunk";
import * as api from "@Lib/api";

const GET_LABEL = "label/GET_LABEL";
const GET_LABEL_SUCCESS = "label/GET_LABEL_SUCCESS";

const POST_LABEL = "label/POST_LABEL";
const POST_LABEL_SUCCESS = "label/POST_LABEL_SUCCESS";

const EDIT_LABEL = "label/EDIT_LABEL";
const EDIT_LABEL_SUCCESS = "label/EDIT_LABEL_SUCCESS";
const EDIT_LABEL_FAILURE = "label/EDIT_LABEL_FAILURE";

const DELETE_LABEL = "label/DELETE_LABEL";
const DELETE_LABEL_SUCCESS = "label/DELETE_LABEL_SUCCESS";
const DELETE_LABEL_FAILURE = "label/DELETE_LABEL_FAILURE";

export const getLabel = createRequestThunk(GET_LABEL, api.getLabel);
export const createLabel = (params) => createRequestThunk(POST_LABEL, api.createLabel(params));
export const editLabel = (name, params) => createRequestThunk(EDIT_LABEL, api.editLabel(name, params));
export const deleteLabel = (name) => createRequestThunk(DELETE_LABEL, api.deleteLabel(name));

const initialState = {
  labels: null,
};

const label = handleActions(
  {
    [GET_LABEL_SUCCESS]: (state, action) => ({
      ...state,
      labels: action.payload,
    }),
    [POST_LABEL_SUCCESS]: (state, action) => ({
      ...state,
      labels: state.concat(action.payload),
    }),
    [DELETE_LABEL_SUCCESS]: (state, action) => ({
      ...state,
      labels: state.labels.filter((label) => label !== action.payload),
    }),
    [EDIT_LABEL_SUCCESS]: (state, action) => ({
      ...state,
      labels: action.payload,
    }),
    [DELETE_LABEL_FAILURE]: (state, action) => ({
      ...state,
      labels: action.payload,
    }),
  },
  initialState
);

export default label;
