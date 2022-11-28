import { StyleSheet } from "react-native";
import { Colors } from "../../../common/utils/Enums";

export const detailsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.Blue,
  },
  titleContainer: {
    width: "100%",
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.Green,
    justifyContent: "space-between",
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  body: {
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.DarkBlue,
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  favButton: {
    width: 200,
    height: 50,
    backgroundColor: "#fced6e",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    elevation: 5,
  },
  removeFavButton: {
    width: 200,
    height: 50,
    backgroundColor: "#fd5c5c",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    elevation: 5,
  },
  favButtonText: { fontSize: 16, fontWeight: "bold", color: "#000000" },
  removeButtonText: { fontSize: 16, fontWeight: "bold", color: "#ffffff" },
  eventInfoContainer: {
    width: 350,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hourContainer: {
    width: 350,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
