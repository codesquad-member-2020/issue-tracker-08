import { combineReducers } from "redux";

import loading from "@Modules/loading";
import issue from "@Modules/issue";
import label from "@Modules/label";

export default combineReducers({
  loading,
  issue,
  label,
});
