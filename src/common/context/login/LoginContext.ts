import { createContext } from "react";
import { LoginTypes } from "./LoginTypes";
import { User } from "../../../views/LoginScreen/hooks/useLogin";

interface Auth {
  logged: boolean;
  user: User | null;
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
