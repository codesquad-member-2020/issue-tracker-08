import { combineReducers } from "redux";
import loading from "./loading";
import issue from "./issue";
import milestone from "./milestone";
import label from "@Modules/label";

export default combineReducers({
  loading,
  issue,
  milestone,
  label,
});
