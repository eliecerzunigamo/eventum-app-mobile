import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#5664e6",
  },
  header: {
    width: "100%",
    height: 50,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#a1c6f0",
    justifyContent: "space-evenly",
  },
  title: {
    borderBottomWidth: 1,
    borderColor: "black",
    width: "60%",
    height: 40,
    fontFamily: "FiraSans-Regular",
  },
  filterButton: {
    width: 90,
    height: 32,
    backgroundColor: "#4d96e9",
    borderRadius: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 10,
    flexDirection: "row",
  },
  filterText: {
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
    height: "100%",
    marginTop: 20,
  },
  eventsContainer: {
    width: "100%",
    alignItems: "center",
  },
});
