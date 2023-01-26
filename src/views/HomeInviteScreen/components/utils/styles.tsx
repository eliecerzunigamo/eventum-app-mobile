import { StyleSheet } from "react-native";
import { Colors } from "../../../../common/utils/Enums";

export const eventItemStyles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    backgroundColor: Colors.Light,
    marginBottom: 20,
    elevation: 10,
    paddingBottom: 20,
  },
  image: {},
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 10,
  },
  title: {
    fontSize: 24,
    paddingLeft: 10,
    paddingBottom: 5,
    fontWeight: "bold",
    color: Colors.Dark,
  },
  description: {
    fontSize: 14,
    fontWeight: "normal",
    paddingTop: 5,
    color: Colors.Dark,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
  },
  hourContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 20,
    width: 80,
  },
});
