import React, { useState, useContext, useEffect } from "react";
import { useApi } from "../../../common/utils/useApi";
import { LoginContext } from "../../../common/context/login/LoginContext";
import { LoginTypes } from "../../../common/context/login/LoginTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedIn } from "../../../common/components/AuthProvider/AuthProvider";

export interface LoginResponse {
  token: string;
  user: User;
}

export type UserType =
  | "estudiante"
  | "director de programa"
  | "docente"
  | "profesional"
  | "otro";
export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  user_type: UserType;
  phone: string;
  age: string;
  __v: number;
}

interface LoginBody {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const { post } = useApi();

  const { auth, dispatch } = useContext(LoginContext);

  useEffect(() => {
    setLoading(true);
    isLoggedIn().then((resp) => {
      dispatch({ type: LoginTypes.login, payload: resp });
      setLoading(false);
    });
  }, []);

  const login = async (body: LoginBody) => {
    setError("");
    setLoadingLogin(true);
    try {
      const resp = await post<LoginBody, LoginResponse, null>(
        "users/login",
        body
      );
      dispatch({
        type: LoginTypes.login,
        payload: {
          logged: true,
          user: { ...resp.data.user },
        },
      });
      await AsyncStorage.setItem("token", resp.data.token);
      await AsyncStorage.setItem(
        "userInfo",
        JSON.stringify({
          logged: true,
          user: { ...resp.data.user },
        })
      );
    } catch (error: any) {
      if (!error.response.data.message) {
        setError("Error de conexión");
        return;
      }

      setError(error.response.data.message);
    } finally {
      setLoadingLogin(false);
    }
  };

  return {
    login,
    error,
    loading,
    loadingLogin,
  };
};
