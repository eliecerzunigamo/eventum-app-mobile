import { StyleSheet } from "react-native";
import { Colors } from "../../../../common/utils/Enums";

export const eventItemStyles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    backgroundColor: Colors.DarkBlue,
    marginBottom: 20,
    paddingVertical: 15,
    elevation: 10,
  },
  image: {
    marginVertical: 10,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginLeft: 10,
    width: "100%",
  },
  title: {
    fontSize: 16,
    paddingLeft: 10,
    paddingBottom: 5,
    fontWeight: "bold",
    color: Colors.Light,
  },
  description: {
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 5,
    color: Colors.Light,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
  },
  hourContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 20,
    width: 45,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 20,
    width: 80,
  },
});
