import { StyleSheet } from "react-native";

export const eventItemStyles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    backgroundColor: "#1f1f1f",
    marginBottom: 20,
    paddingVertical: 10,
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
    width: "100%",
  },
  title: {
    fontSize: 16,
    paddingLeft: 10,
    paddingBottom: 5,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 5,
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
