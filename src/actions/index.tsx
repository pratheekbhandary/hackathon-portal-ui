import { Action, USER_LOGIN, ALERT, IDEA_SELECTED } from "./actionTypes";
import {AnyAction} from 'redux';
import {AlertState} from '../reducers/reduxState';

export function userLogin(user: any): Action {
  return {
    type: USER_LOGIN,
    payload: user
  };
}

export function throwError(error: AlertState): AnyAction{
  return {
    type: ALERT,
    payload: error
  };
}

export function clearError(): AnyAction{
  return {
    type: ALERT,
    payload: {message:"",type:""}
  };
}

export function selectIdea(ideaId:string): AnyAction{
  return {
    type: IDEA_SELECTED,
    payload: ideaId
  }
}