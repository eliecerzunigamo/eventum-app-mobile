import { View } from "react-native";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/Feather";
import { Colors } from "../../utils/Enums";
import { LoginContext } from "../../context/login/LoginContext";

interface Props {
  func: () => void;
}

export default function OpenMenuButton({ func }: Props) {
  const { auth } = useContext(LoginContext);
  return (
    <View>
      <Icon
        onPress={() => func()}
        style={{ marginRight: 10 }}
        name="menu"
        size={30}
        color={
          auth.user?.user_type === "director de programa" ||
          auth.user?.user_type === "docente"
            ? Colors.Dark
            : Colors.Blue
        }
      />
    </View>
  );
}
