import { Action, USER_LOGIN, ERROR } from "./actionTypes";

export function userLogin(user: any): Action {
  return {
    type: USER_LOGIN,
    payload: user
  };
}

export function throwError(error: string): Action {
  return {
    type: ERROR,
    payload: error
  };
}

export function clearError(): Action {
  return {
    type: ERROR,
    payload: ""
  };
}
