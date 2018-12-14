import { combineReducers } from "redux";
import { userReducer as user } from "./userLogin";
import { ReduxState } from "./reduxState";
import { errorReducer as error } from "./errorReducer";

export default combineReducers<ReduxState>({
  user,
  error
});
