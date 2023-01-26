import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { toTitle } from "../../../common/utils/toTitle";
import { styles } from "../../LoginScreen/utils/styles";

interface Props {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  defaultValue: string;
  values: any[];
  isPrimary?: boolean;
}

export default function CustomPicker({
  selectedValue,
  setSelectedValue,
  defaultValue,
  values,
  isPrimary = true,
}: Props) {
  return (
    <View
      style={{
        ...styles.input,
      }}
    >
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: "100%", color: "black" }}
        onValueChange={(itemValue: string, itemIndex) =>
          setSelectedValue(itemValue)
        }
      >
        {selectedValue === "default" && (
          <Picker.Item
            style={{
              fontSize: 18,
            }}
            key={"default"}
            label={toTitle(defaultValue)}
            value={"default"}
          />
        )}
        {values.map((faculty: { _id: string; name: string; id?: string }) => (
          <Picker.Item
            style={{
              fontSize: 18,
            }}
            key={faculty._id}
            label={toTitle(faculty.name)}
            value={isPrimary ? faculty._id : faculty.id}
          />
        ))}
      </Picker>
    </View>
  );
}
