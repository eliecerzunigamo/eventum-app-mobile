import { StyleSheet } from "react-native";
import { Colors } from "../../../common/utils/Enums";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.Blue,
  },
  scrollContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 30,
    marginBottom: 30,
  },
  formContainer: {
    width: "80%",
    height: 350,
    backgroundColor: Colors.Green,
    borderRadius: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 10,
    marginBottom: 20,
    padding: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: Colors.Grey,
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 10,
    color: "white",
    fontFamily: "FiraSans-Regular",
  },
  errorLabel: {
    fontFamily: "FiraSans-Regular",
    color: Colors.Danger,
    fontSize: 12,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "black",
    width: "100%",
    height: 50,
    backgroundColor: Colors.Light,
    fontFamily: "FiraSans-Regular",
    elevation: 5,
    fontSize: 14,
    color: "black",
  },
  button: {
    width: 80,
    height: 32,
    backgroundColor: Colors.Blue,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    textShadowColor: Colors.Grey,
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 10,
    color: Colors.Light,
    fontFamily: "FiraSans-Regular",
  },
  link: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.Grey,
    fontFamily: "FiraSans-Regular",
  },
});
