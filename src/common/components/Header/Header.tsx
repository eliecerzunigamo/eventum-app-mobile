import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/Feather";
import { LoginContext } from "../../context/login/LoginContext";
import { Colors } from "../../utils/Enums";
import BackButton from "../BackButton/BackButton";

interface Props {
  func: () => void;
  title: string;
  previousRoute?: string;
  leftFunc?: () => void;
}

export default function Header({
  func,
  title,
  previousRoute,
  leftFunc,
}: Props) {
  const { auth } = useContext(LoginContext);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        height: 50,
        width: "100%",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Icon
          onPress={() => func()}
          style={{ marginLeft: 10 }}
          name="menu"
          size={30}
          color={
            auth.user?.user_type === "director de programa" ||
            auth.user?.user_type === "docente"
              ? Colors.LightOrange
              : Colors.Blue
          }
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            marginLeft: 10,
            color: Colors.Dark,
          }}
        >
          {title}
        </Text>
      </View>
      {previousRoute && <BackButton previousRoute={previousRoute} />}
      {leftFunc && (
        <TouchableOpacity onPress={() => leftFunc()}>
          <Icon
            style={{ marginRight: 10 }}
            name="x"
            size={30}
            color={
              auth.user?.user_type === "director de programa" ||
              auth.user?.user_type === "docente"
                ? Colors.LightOrange
                : Colors.Blue
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
