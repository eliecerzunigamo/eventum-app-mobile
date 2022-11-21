import { StyleSheet } from "react-native";

export const eventItemStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    height: 125,
    backgroundColor: "#1f1f1f",
    marginBottom: 10,
    padding: 10,
    elevation: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginLeft: 10,
    width: "70%",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 12,
    fontWeight: "bold",
    width: 220,
    height: 70,
    color: "#dddddd",
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
