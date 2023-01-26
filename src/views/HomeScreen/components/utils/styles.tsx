import { StyleSheet } from "react-native";
import { Colors } from "../../../../common/utils/Enums";
import { styles as LoginStyles } from "../../../LoginScreen/utils/styles";

export const filtersModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Light,
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    color: Colors.Dark,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.Grey,
  },
  clearButton: LoginStyles.button,
  clearButtonText: LoginStyles.buttonText,
});
