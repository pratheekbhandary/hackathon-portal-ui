import { Action, ERROR } from "../actions/actionTypes";

export const errorState: string = "";

export function errorReducer(
  state: string = errorState,
  action: Action
): string {
  if (action.type === ERROR) {
    return action.payload;
  }
  return state;
}
