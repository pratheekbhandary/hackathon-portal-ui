import { combineReducers } from "redux";
import { userReducer as user } from "./userLogin";
import { ReduxState } from "./reduxState";
import { errorReducer as alert } from "./errorReducer";
import {ideaSelected} from './ideaSelected';

export default combineReducers<any>({
  user,
  alert,
  ideaSelected
});
