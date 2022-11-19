import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  backgroundImg: {
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 280,
    marginTop: 30,
  },
  formContainer: {
    width: "80%",
    height: 350,
    backgroundColor: "#e7e7fc",
    borderRadius: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "#cfcdcd",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 10,
    color: "#000000",
    fontFamily: "FiraSans-Regular",
  },
  errorLabel: {
    fontFamily: "FiraSans-Regular",
    color: "#f75858",
    fontSize: 10,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "black",
    width: 200,
    height: 40,
    backgroundColor: "#dddbff",
    fontFamily: "FiraSans-Regular",
    elevation: 5,
  },
  button: {
    width: 80,
    height: 32,
    backgroundColor: "#4d96e9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    textShadowColor: "#aaaaaa",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 10,
    color: "#ffffff",
    fontFamily: "FiraSans-Regular",
  },
  link: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8b8a8a",
    fontFamily: "FiraSans-Regular",
  },
});
