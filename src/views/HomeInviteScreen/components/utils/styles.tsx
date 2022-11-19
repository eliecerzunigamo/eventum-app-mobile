import { StyleSheet } from "react-native";

export const eventItemStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    height: 115,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2b1d66",
  },
  description: {
    fontSize: 12,
    fontWeight: "bold",
    width: 220,
    height: 70,
    color: "#150f2c",
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
    width: 55,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 20,
    width: 95,
  },
});
