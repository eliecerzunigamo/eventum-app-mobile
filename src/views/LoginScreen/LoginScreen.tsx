import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useLogin } from "./hooks/useLogin";
import { styles } from "./utils/styles";
import { emailValidate, passValidate } from "./utils/validator";

export const LoginScreen = () => {
  const navigate = useNavigation<StackNavigationProp<any>>();

  const { login, loading, error, loadingLogin } = useLogin();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/Background.png")}
          style={styles.backgroundImg}
        >
          <ScrollView>
            <View style={styles.scrollContainer}>
              <Image
                style={styles.logo}
                source={require("../../assets/EventumAppLogo.png")}
              />
              {!loading ? (
                <View style={styles.formContainer}>
                  <Text style={styles.label}>Iniciar sesión</Text>
                  {error.length > 0 ? (
                    <Text style={styles.errorLabel}>{error}</Text>
                  ) : null}
                  <TextInput
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                    placeholder="Email"
                    style={styles.input}
                    onBlur={() => {
                      emailValidate(email)
                        ? setValidEmail(true)
                        : setValidEmail(false);
                    }}
                  />
                  {!validEmail ? (
                    <Text style={styles.errorLabel}>
                      *Por favor ingrese un email válido
                    </Text>
                  ) : null}
                  <TextInput
                    onChange={(e) => setPassword(e.nativeEvent.text)}
                    placeholder="Contraseña"
                    style={styles.input}
                    secureTextEntry={true}
                    onBlur={() => {
                      passValidate(password)
                        ? setValidPassword(true)
                        : setValidPassword(false);
                    }}
                  />
                  {!validPassword ? (
                    <Text style={styles.errorLabel}>
                      *Por favor ingrese una contraseña válida
                    </Text>
                  ) : null}
                  <TouchableOpacity
                    onPress={() => {
                      login({
                        email,
                        password,
                      });
                    }}
                    style={styles.button}
                  >
                    {loadingLogin ? (
                      <ActivityIndicator size="small" />
                    ) : (
                      <Text style={styles.buttonText}>Ingresar</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigate.push("Home")}>
                    <Text style={styles.link}>Vistazo al App</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ActivityIndicator size="large" />
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
};
