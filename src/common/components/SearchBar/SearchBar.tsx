import { View, TextInput } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { Colors } from "../../utils/Enums";
import { homeInviteScreenStyles } from "../../../views/HomeInviteScreen/utils/styles";

interface Props {
  setQuery: (query: string) => void;
}

export default function SearchBar({ setQuery }: Props) {
  return (
    <View>
      <Icon
        style={{
          position: "absolute",
          left: 10,
          top: 10,
          zIndex: 1,
        }}
        name="search"
        size={17}
        color={Colors.Dark}
      />
      <TextInput
        placeholderTextColor={Colors.Dark}
        style={homeInviteScreenStyles.searchInput}
        placeholder={"Buscar"}
        onChangeText={(text) => setQuery(text)}
      ></TextInput>
    </View>
  );
}
