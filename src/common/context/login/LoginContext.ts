import { createContext } from "react";
import { LoginTypes } from "./LoginTypes";

interface Auth {
  logged: boolean;
  user?: {
    email?: string;
    name?: string;
    user_type?: string;
  } | null;
}

interface IContext {
  dispatch: Function;
  auth: Auth;
}

interface IAction {
  type: LoginTypes;
  user: Auth;
}

export const LoginContext = createContext<IContext>({
  dispatch: ({ type, user }: IAction) => {},
  auth: {
    logged: false,
    user: null,
  },
});
