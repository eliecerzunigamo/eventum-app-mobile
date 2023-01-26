import { StyleSheet } from "react-native";
import { Colors } from "../../../common/utils/Enums";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Light,
    alignItems: "center",
    paddingTop: 30,
    width: "100%",
  },
  formContainer: {
    width: "95%",
  },
  descriptionLabel: {
    fontFamily: "FiraSans-Regular",
    color: Colors.Dark,
    fontSize: 10,
    fontWeight: "normal",
    marginLeft: 10,
    marginBottom: 15,
  },
  noFillCheckBox: {
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.Danger,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  fillCheckBox: {
    width: 12,
    height: 12,
    backgroundColor: Colors.Danger,
    borderRadius: 2,
  },
  userTypeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 10,
    borderBottomWidth: 2,
    paddingBottom: 10,
    borderBottomColor: Colors.LightGrey,
  },
  userTypeLabel: {
    fontFamily: "FiraSans-Regular",
    color: Colors.Dark,
    fontSize: 18,
    fontWeight: "normal",
  },
});
