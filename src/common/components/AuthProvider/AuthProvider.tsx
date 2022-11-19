import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useReducer, useState } from "react";
import { LoginReducer } from "../../context/login/LoginActions";
import { LoginContext } from "../../context/login/LoginContext";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const isLoggedIn = async () => {
  let userInfo = await AsyncStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return null;
  }
};

export const AuthProvider = ({ children }: Props) => {
  /*@ts-ignore*/
  const [auth, dispatch] = useReducer(LoginReducer, {}, isLoggedIn);
  return (
    <LoginContext.Provider
      value={{
        auth,
        dispatch,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
