import { handleActions } from "redux-actions";
import createRequestThunk from "../lib/createRequestThunk";
import * as api from "@Lib/api";

const GET_LABEL = "label/GET_LABEL";
const DELETE_LABEL = "label/DELETE_LABEL";
const GET_LABEL_SUCCESS = "label/GET_LABEL_SUCCESS";
const DELETE_LABEL_SUCCESS = "label/DELETE_LABEL_SUCCESS";

export const getLabel = createRequestThunk(GET_LABEL, api.getLabel);
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
    [DELETE_LABEL_SUCCESS]: (state, action) => ({
      ...state,
      labels: state.labels.filter((label) => label !== action.payload),
    }),
  },
  initialState
);

export default label;
