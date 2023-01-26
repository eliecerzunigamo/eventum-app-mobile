import { View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Colors } from "../../utils/Enums";

interface Props {
  previousRoute: string;
}

export default function BackButton({ previousRoute }: Props) {
  const navigate = useNavigation<StackNavigationProp<any>>();
  return (
    <View>
      <Icon
        onPress={() => navigate.navigate(previousRoute)}
        style={{ marginRight: 10 }}
        name="arrow-left"
        size={30}
        color={Colors.Dark}
      />
    </View>
  );
}
