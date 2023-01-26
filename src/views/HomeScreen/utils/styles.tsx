import { StyleSheet } from "react-native";
import { Colors } from "../../../common/utils/Enums";

export const HomeStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.Light,
  },
  header: {
    width: "100%",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.Green,
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
    backgroundColor: Colors.DarkGreen,
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 10,
    flexDirection: "row",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 10,
    color: Colors.Light,
    fontFamily: "FiraSans-Regular",
  },
  scrollViewContainer: {
    width: "100%",
    height: "100%",
  },
  eventsContainer: {
    width: "100%",
    alignItems: "center",
    height: "100%",
  },
});
