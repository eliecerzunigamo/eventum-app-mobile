import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../../common/utils/Enums";

interface Props {
  title: string;
  value: string;
  lineWidth?: number;
}

export const InfoItem = ({ title, value }: Props) => {
  return (
    <>
      <View
        style={{
          marginTop: 10,
          marginBottom: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={{ color: Colors.Dark, fontSize: 16 }}>{title}</Text>
        <Text style={{ color: Colors.Dark, fontSize: 14, width: "50%" }}>
          {value}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: Colors.LightGrey,
        }}
      />
    </>
  );
};
