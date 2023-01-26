import React, { useContext, useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { LoginContext } from "../../common/context/login/LoginContext";
import { HomeStyles } from "../HomeScreen/utils/styles";
import { toTitle } from "../../common/utils/toTitle";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { InfoItem } from "./components/InfoItem";
import { Colors } from "../../common/utils/Enums";
import Header from "../../common/components/Header/Header";
import { SidebarTypes } from "../../common/context/sidebar/SideBarTypes";
import { SidebarContext } from "../../common/context/sidebar/SidebarContext";

export enum AdminUserTypes {
  DirectorDePrograma = "director de programa",
}

export const UserScreen = () => {
  const navigate = useNavigation<StackNavigationProp<any>>();

  const { dispatch } = useContext(SidebarContext);

  const { auth } = useContext(LoginContext);
  const { user } = auth;
  const { email, name, user_type, password, age, phone } = user!;

  return (
    <ScrollView style={{ backgroundColor: Colors.Light }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: Colors.Light,
          paddingBottom: 20,
        }}
      >
        <Header
          func={() => {
            dispatch({
              type: SidebarTypes.Open,
            });
          }}
          title="Perfil"
          previousRoute="Home"
        />
        <View
          style={{
            width: 210,
            height: 200,
            backgroundColor: Colors.Light,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Image
            source={require("../../assets/user.png")}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 24,
            color: Colors.Dark,
          }}
        >
          {toTitle(name)}
        </Text>
        <View
          style={{ width: "90%", height: 1, backgroundColor: Colors.LightGrey }}
        />
        <View
          style={{
            alignItems: "flex-start",
            paddingTop: 15,
            flexDirection: "column",
            width: "90%",
          }}
        >
          <InfoItem title="Correo" value={toTitle(email)} />
          <InfoItem title="Contraseña" value="**********" lineWidth={100} />
          <InfoItem title="Edad" value={age} />
          <InfoItem title="Teléfono" value={phone} />
          <InfoItem title="Email" value={email} />
          <InfoItem title="Tipo de usuario" value={toTitle(user_type)} />
        </View>
      </View>
    </ScrollView>
  );
};
