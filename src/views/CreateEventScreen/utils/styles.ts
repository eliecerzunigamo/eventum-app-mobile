import { StyleSheet } from "react-native";
import { HomeStyles } from "../../HomeScreen/utils/styles";

export const createEventScreen = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F2561D",
    paddingBottom: 20,
  },
  header: {
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: { color: "white", fontSize: 20 },
  scrollView: {
    flex: 1,
    width: "100%",
    padding: 20,
  },
  scrollViewContent: {
    paddingBottom: 50,
  },
  label: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageButton: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    backgroundColor: "white",
  },
  imageContainer: {
    alignSelf: "center",
    borderWidth: 5,
    borderColor: "white",
    backgroundColor: "white",
  },

  dateButton: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#551700ac",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  dateButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  creationButton: {
    ...HomeStyles.filterButton,
    marginTop: 50,
    width: 150,
    height: 50,
    justifyContent: "center",
    backgroundColor: "#1f1f1f",
  },
  creationButtonText: {
    ...HomeStyles.filterText,
    fontSize: 14,
    color: "#ffffff",
  },
});
