import React, { useContext, useEffect } from "react";
import { TouchableOpacity, View, Text, Image, ScrollView } from "react-native";
import { LoginContext } from "../../common/context/login/LoginContext";
import { LoginTypes } from "../../common/context/login/LoginTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HomeStyles } from "../HomeScreen/utils/styles";
import { toTitle } from "../../common/utils/toTitle";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { InfoItem } from "./components/InfoItem";

export enum AdminUserTypes {
  DirectorDePrograma = "director de programa",
}

export const UserScreen = () => {
  const navigate = useNavigation<StackNavigationProp<any>>();

  const { auth, dispatch } = useContext(LoginContext);

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userInfo");
    dispatch({ type: LoginTypes.logout });
  };

  const { user } = auth;
  const { email, name, user_type, fac, program } = user!;

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#F2561D",
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            ...HomeStyles.header,
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Perfil</Text>
          <TouchableOpacity style={HomeStyles.filterButton} onPress={logout}>
            <Text style={HomeStyles.filterText}>Salir</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 155,
            borderRadius: 77.25,
            height: 155,
            backgroundColor: "#fdfdfd",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Image
            source={require("../../assets/user.png")}
            style={{
              height: 150,
              width: 150,
            }}
          />
        </View>

        <View style={{ width: "100%", height: 5, backgroundColor: "white" }} />

        <View
          style={{
            alignItems: "flex-start",
            paddingTop: 15,
            flexDirection: "column",
            width: "100%",
            paddingLeft: 10,
          }}
        >
          <InfoItem title="Nombre:" value={toTitle(name)} lineWidth={55} />

          <InfoItem
            title="Tipo de usuario:"
            value={toTitle(user_type)}
            lineWidth={100}
          />
          <InfoItem title="Facultad:" value={toTitle(fac)} lineWidth={56} />
          <InfoItem title="Programa:" value={toTitle(program)} lineWidth={65} />
          <InfoItem title="Email:" value={email} lineWidth={38} />
        </View>
        {AdminUserTypes.DirectorDePrograma === user_type && (
          <TouchableOpacity
            style={{
              ...HomeStyles.filterButton,
              marginTop: 50,
              width: 150,
              height: 50,
              justifyContent: "center",
              backgroundColor: "#1f1f1f",
            }}
            onPress={() => navigate.navigate("CreateEvent")}
          >
            <Text
              style={{
                ...HomeStyles.filterText,
                fontSize: 14,
                color: "#ffffff",
              }}
            >
              Crear evento
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
