import { combineReducers } from "redux";
import issue from "./issue";
import milestone from "./milestone";
import loading from "./loading";

export default combineReducers({
  issue,
  milestone,
  loading,
});
