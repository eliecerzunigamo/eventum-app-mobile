import React, { useContext } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Header } from "@react-navigation/elements";
import { LoginContext } from "../../common/context/login/LoginContext";
import { LoginTypes } from "../../common/context/login/LoginTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserScreen = () => {
  const { auth, dispatch } = useContext(LoginContext);

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userInfo");
    dispatch({ type: LoginTypes.logout });
  };
  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
