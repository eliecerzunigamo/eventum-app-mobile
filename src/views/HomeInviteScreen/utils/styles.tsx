import { StyleSheet } from "react-native";
import { Colors } from "../../../common/utils/Enums";

export const homeInviteScreenStyles = StyleSheet.create({
  scrollViewContainer: {
    width: "100%",
    backgroundColor: Colors.Light,
  },
  scrollView: {
    width: "100%",
    height: "90%",
    marginTop: 20,
  },
  eventItemContainer: {
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    height: "2%",
  },
  emptyText: {
    fontSize: 18,
    color: Colors.Dark,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  searchInput: {
    width: "100%",
    height: 40,
    backgroundColor: Colors.Light,
    color: Colors.Dark,
    fontSize: 16,
    borderColor: Colors.Grey,
    borderWidth: 1,
    borderRadius: 5,
    elevation: 10,
    paddingLeft: 35,
  },
});
