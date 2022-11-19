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
    backgroundColor: "#5664e6",
    borderRadius: 5,
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
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    marginTop: 10,
    marginBottom: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 3,
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
