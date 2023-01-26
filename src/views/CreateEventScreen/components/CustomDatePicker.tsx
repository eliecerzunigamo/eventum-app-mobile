import { View, Text, TouchableOpacity } from "react-native";
import { styles as registerStyles } from "../../RegisterScreen/utils/styles";
import React, { SetStateAction, useState } from "react";
import { styles } from "../../LoginScreen/utils/styles";
import { Colors } from "../../../common/utils/Enums";
import DatePicker from "react-native-date-picker";
import Select from "./Select";

interface Props {
  datePickerLabel: String;
  setDate: (date: Date) => void;
  selectedDate: Date;
  dateLabel: string;
  dateModalTitle: string;
  dateModalMode: "date" | "time" | "datetime";
  optionValue: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<SetStateAction<string>>;
}

export default function CustomDatePicker({
  datePickerLabel,
  setDate,
  selectedDate,
  dateLabel,
  dateModalMode,
  dateModalTitle,
  optionValue,
  selectedValue,
  setSelectedValue,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={registerStyles.userTypeLabel}>{datePickerLabel}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.input,
              width: 150,
              height: 40,
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 20,
              marginRight: 20,
            }}
            onPress={() => setOpen(true)}
          >
            <Text
              style={{
                color: Colors.Dark,
              }}
            >
              {dateLabel}
            </Text>
          </TouchableOpacity>
          <Select
            optionValue={optionValue}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            haveLabel={false}
          />
        </View>
      </View>
      <DatePicker
        title={dateModalTitle}
        modal
        open={open}
        date={selectedDate}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode={dateModalMode}
      />
    </View>
  );
}
