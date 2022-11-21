import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F2561D",
  },
  header: {
    width: "100%",
    height: 50,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#1f1f1f",
    justifyContent: "space-evenly",
  },
  title: {
    borderBottomWidth: 1,
    borderColor: "white",
    width: "60%",
    height: 40,
    fontFamily: "FiraSans-Regular",
    color: "white",
    placeholderTextColor: "white",
  },
  filterButton: {
    width: 90,
    height: 32,
    backgroundColor: "#ff7c4da4",
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 10,
    flexDirection: "row",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "bold",
    textShadowColor: "#616161",
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
