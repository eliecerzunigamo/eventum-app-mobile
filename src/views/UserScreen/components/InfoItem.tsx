import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../../common/utils/Enums";

interface Props {
  title: string;
  value: string;
  lineWidth?: number;
}

export const InfoItem = ({ title, value, lineWidth = 1 }: Props) => {
  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
        {title}
      </Text>
      <Text style={{ color: Colors.Grey, fontSize: 18, fontWeight: "bold" }}>
        {value}
      </Text>
    </View>
  );
};
