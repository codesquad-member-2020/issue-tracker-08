import { handleActions } from "redux-actions";
import createRequestThunk from "@Lib/createRequestThunk";
import * as api from "@Lib/api";

const GET_LABEL = "label/GET_LABEL";
const GET_LABEL_SUCCESS = "label/GET_LABEL_SUCCESS";
const POST_LABEL = "label/POST_LABEL";
const EDIT_LABEL = "label/EDIT_LABEL";
const DELETE_LABEL = "label/DELETE_LABEL";

export const getLabel = createRequestThunk(GET_LABEL, api.getLabel);
export const createLabel = createRequestThunk(POST_LABEL, api.createLabel);
export const editLabel = createRequestThunk(EDIT_LABEL, api.editLabel);
export const deleteLabel = createRequestThunk(DELETE_LABEL, api.deleteLabel);

const initialState = { labels: null };

const label = handleActions(
  {
    [GET_LABEL_SUCCESS]: (state, action) => ({
      ...state,
      labels: action.payload.data,
    }),
  },
  initialState
);

export default label;
