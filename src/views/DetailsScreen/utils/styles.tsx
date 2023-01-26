import { StyleSheet } from "react-native";
import { Colors } from "../../../common/utils/Enums";

export const detailsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Light,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.Dark,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 10,
  },
  body: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: Colors.Light,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGrey,
    paddingBottom: 20,
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
  hourContainer: {
    width: 350,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
