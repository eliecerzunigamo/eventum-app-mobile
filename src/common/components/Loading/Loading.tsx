import React from "react";
import { View, Modal } from "react-native";
import { filtersModalStyles } from "../../../views/HomeScreen/components/utils/styles";
import { ActivityIndicator } from "react-native-paper";

interface Props {
  open: boolean;
}
export const Loading = ({ open }: Props) => {
  return (
    <Modal visible={open} animationType="fade" transparent={true}>
      <View style={filtersModalStyles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </Modal>
  );
};
