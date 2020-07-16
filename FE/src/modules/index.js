import { combineReducers } from "redux";
import loading from "@Modules/loading";
import issue from "@Modules/issue";
import milestone from "@Modules/milestone";
import label from "@Modules/label";
import user from "@Modules/user";
import option from "@Modules/option";

export default combineReducers({
  loading,
  issue,
  milestone,
  label,
  user,
  option,
});
