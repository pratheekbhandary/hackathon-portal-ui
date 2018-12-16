import { ALERT } from "../actions/actionTypes";
import {AlertState} from "./reduxState";
import { AnyAction } from "redux";

const alertState={message:"",type:""}

export function errorReducer(
  state: AlertState = alertState,
  action: AnyAction
): AlertState {
  if (action.type === ALERT) {
    return action.payload;
  }
  return state;
}
