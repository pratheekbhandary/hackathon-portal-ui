export interface UserState {
  name: string;
  email: string;
}

export interface ReduxState {
  user: UserState;
  alert: string;
  ideaSelected: string;
}

export interface AlertState {
  message: string;
  type: string;
}
