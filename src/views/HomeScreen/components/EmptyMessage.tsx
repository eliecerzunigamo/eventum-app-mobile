import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { HomeStyles as styles } from "../utils/styles";
import { Colors } from "../../../common/utils/Enums";

export default function EmptyMessage() {
  return (
    <View
      style={{
        ...styles.scrollViewContainer,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
      }}
    >
      <Icon name="calendar" color={"#1d1d1d"} size={50} />
      <Text
        style={{
          fontSize: 18,
          color: Colors.Dark,
          textAlign: "center",
          marginTop: 30,
        }}
      >
        Aun se han agregado eventos
      </Text>
    </View>
  );
}
