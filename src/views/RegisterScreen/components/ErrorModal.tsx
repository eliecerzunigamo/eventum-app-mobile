import React from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { Colors } from "../../../common/utils/Enums";
import { styles } from "../../LoginScreen/utils/styles";

interface Props {
  error: string;
  open: boolean;
  close: () => void;
}

export const ErrorModal = ({ error, open, close }: Props) => {
  return (
    <Modal visible={open} animationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            height: "20%",
            backgroundColor: Colors.Light,
            padding: 20,
            elevation: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: Colors.Danger,
              fontWeight: "bold",
            }}
          >
            {error}
          </Text>
          <TouchableOpacity
            onPress={() => close()}
            style={{ ...styles.button, backgroundColor: Colors.Danger }}
          >
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
