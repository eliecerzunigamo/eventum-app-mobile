import { LoginTypes } from "./LoginTypes";

interface Iaction {
  type: string;
  payload: {
    email: string;
  } | null;
}

interface state {
  logged: boolean;
  user?: {
    email?: string;
    name?: string;
    user_type?: string;
  } | null;
}

export const LoginReducer = (state: state, action: Iaction) => {
  switch (action.type) {
    case LoginTypes.login:
      return {
        ...action.payload,
      };
    case LoginTypes.logout:
      return {
        logged: false,
        user: null,
      };
    default:
      return {
        logged: false,
        user: null,
      };
  }
};
