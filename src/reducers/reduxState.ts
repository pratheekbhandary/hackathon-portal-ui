export interface UserState {
  name: string;
  email: string;
}

export interface ReduxState {
  user: UserState;
  error: string;
}
