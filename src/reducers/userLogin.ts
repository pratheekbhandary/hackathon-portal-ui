import { Action, USER_LOGIN } from "../actions/actionTypes";
import { UserState } from "./reduxState";

export const userState: UserState = { name: "", email: "" };
export function userReducer(
  state: UserState = userState,
  action: Action
): UserState {
  if (action.type === USER_LOGIN) {
    return Object.assign({}, state, action.payload);
  }
  return state;
}
