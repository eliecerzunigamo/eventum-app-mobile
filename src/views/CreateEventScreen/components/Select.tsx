import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles as registerStyles } from "../../RegisterScreen/utils/styles";
import { Colors } from "../../../common/utils/Enums";

interface Props {
  optionLabel?: string;
  optionValue: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  haveLabel?: boolean;
}

export default function Select({
  optionLabel,
  optionValue,
  selectedValue,
  setSelectedValue,
  haveLabel = true,
}: Props) {
  return (
    <View
      style={{
        ...registerStyles.userTypeSelector,
        marginLeft: 0,
        borderBottomWidth: haveLabel ? 1 : 0,
      }}
    >
      {haveLabel && (
        <Text style={{ ...registerStyles.userTypeLabel }}>{optionLabel}</Text>
      )}
      {optionValue === selectedValue ? (
        <TouchableOpacity
          style={{
            ...registerStyles.noFillCheckBox,
            backgroundColor: Colors.Orange,
            borderColor: Colors.Orange,
          }}
          onPress={() => setSelectedValue("")}
        ></TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            ...registerStyles.noFillCheckBox,
            borderColor: Colors.Orange,
          }}
          onPress={() => setSelectedValue(optionValue)}
        />
      )}
    </View>
  );
}
