import React from "react";
import { View, Modal } from "react-native";
import { filtersModalStyles } from "../../../views/HomeScreen/components/utils/styles";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "../../utils/Enums";

interface Props {
  open: boolean;
}
export const Loading = ({ open }: Props) => {
  return (
    <Modal visible={open} animationType="fade" transparent={true}>
      <View
        style={{
          ...filtersModalStyles.container,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </View>
    </Modal>
  );
};
