import { combineReducers } from "redux";
import issue from "./issue";
import loading from "./loading";

export default combineReducers({
  issue,
  loading,
});
