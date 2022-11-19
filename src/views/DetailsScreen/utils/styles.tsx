import { StyleSheet } from "react-native";

export const detailsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#5664e6",
  },
  titleContainer: {
    width: "100%",
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#b0d5ff",
    justifyContent: "space-between",
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#3f3f3f" },
  body: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#ffffff",
  },
  image: {
    width: 350,
    height: 200,
    borderRadius: 4,
  },
  favButton: {
    width: 180,
    height: 50,
    backgroundColor: "#fce300",
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    elevation: 5,
  },
  favButtonText: { fontSize: 16, fontWeight: "bold", color: "#272727" },
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
