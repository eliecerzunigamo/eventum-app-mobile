import { View, Image } from "react-native";
import React from "react";
import { createEventScreen } from "../utils/styles";
interface Props {
  base64: string;
  size: {
    width: number;
    height: number;
  };
}
export default function Base64Image({ base64, size }: Props) {
  return (
    <View
      style={{
        padding: 10,
        marginBottom: 20,
      }}
    >
      <Image
        source={{ uri: base64 }}
        style={{
          ...size,
          ...createEventScreen.imageContainer,
        }}
      />
    </View>
  );
}
