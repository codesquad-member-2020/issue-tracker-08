import { handleActions } from "redux-actions";
import createRequestThunk from "../lib/createRequestThunk";
import { useMemo } from "react";
import * as api from "@Lib/api";

const GET_LABEL = "label/GET_LABEL";
const GET_LABEL_SUCCESS = "label/GET_LABEL_SUCCESS";

export const getLabel = createRequestThunk(GET_LABEL, api.getLabel);

const initialState = {
  labels: null,
};

const label = handleActions(
  {
    [GET_LABEL_SUCCESS]: (state, action) => ({
      ...state,
      labels: action.payload,
    }),
  },
  initialState
);

export default label;
