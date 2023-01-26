import React from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Colors } from "../../../common/utils/Enums";
import { styles } from "../../LoginScreen/utils/styles";

export const SuccessModal = () => {
  const navigate = useNavigation<StackNavigationProp<any>>();
  return (
    <Modal visible={true} animationType="fade" transparent={true}>
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
              fontSize: 24,
              textAlign: "center",
              color: Colors.Danger,
              fontWeight: "bold",
            }}
          >
            Registro exitoso!
          </Text>
          <TouchableOpacity
            onPress={() => navigate.navigate("Login")}
            style={{ ...styles.button, backgroundColor: Colors.Danger }}
          >
            <Text style={styles.buttonText}>Ir al login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
