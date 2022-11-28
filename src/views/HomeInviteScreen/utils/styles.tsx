import { StyleSheet } from "react-native";
import { Colors } from "../../../common/utils/Enums";

export const homeInviteScreenStyles = StyleSheet.create({
  container: {
    height: "8%",
    backgroundColor: Colors.Green,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.Light,
  },
  button: {
    width: 80,
    height: 32,
    backgroundColor: Colors.DarkGreen,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    textShadowColor: Colors.Grey,
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 10,
    color: Colors.Light,
    fontFamily: "FiraSans-Regular",
  },
  scrollViewContainer: {
    width: "100%",
    height: "90%",
    backgroundColor: Colors.Blue,
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
});
