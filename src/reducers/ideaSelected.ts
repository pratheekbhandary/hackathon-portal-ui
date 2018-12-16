import { IDEA_SELECTED} from "../actions/actionTypes";
import { AnyAction } from "redux";

export function ideaSelected(
  state: string = "",
  action: AnyAction
): string {
  if (action.type === IDEA_SELECTED) {
    return action.payload;
  }
  return state;
}
