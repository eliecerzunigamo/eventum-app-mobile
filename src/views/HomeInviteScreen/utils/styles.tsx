import { StyleSheet } from "react-native";

export const homeInviteScreenStyles = StyleSheet.create({
  container: {
    height: "8%",
    backgroundColor: "#daf5ff",
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
    color: "#000000",
  },
  button: {
    width: 80,
    height: 32,
    backgroundColor: "#4d96e9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    textShadowColor: "#aaaaaa",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 10,
    color: "#ffffff",
    fontFamily: "FiraSans-Regular",
  },
  scrollViewContainer: {
    width: "100%",
    height: "90%",
    backgroundColor: "#5664e6",
  },
  scrollView: {
    width: "100%",
    height: "100%",
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
