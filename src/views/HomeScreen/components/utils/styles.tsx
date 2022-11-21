import { StyleSheet } from "react-native";

export const filtersModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    height: "50%",
    backgroundColor: "#1f1f1f",
    padding: 20,
    elevation: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "white",
  },
  pickerContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 20,
  },
  pickerLabel: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  picker: {
    width: "90%",
    height: 35,
    backgroundColor: "#ff7c4da4",
    marginTop: 10,
    marginBottom: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  clearButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#ff7c4da4",
    padding: 10,
  },
  clearButtonTextContainer: {
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "bold",
  },
});
