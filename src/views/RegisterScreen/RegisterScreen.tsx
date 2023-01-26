import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import { styles } from "./utils/styles";
import { styles as stylesLogin } from "../LoginScreen/utils/styles";
import { TextInput } from "react-native-paper";
import { Colors } from "../../common/utils/Enums";
import { useRegister } from "./hooks/useRegister";
import { Loading } from "../../common/components/Loading/Loading";
import { SuccessModal } from "./components/SuccessModal";
import { ErrorModal } from "./components/ErrorModal";

export interface RegisterForm {
  name: string;
  email: string;
  userType: string;
  password: string;
  phone: string;
  age: string;
}

export default function RegisterScreen() {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    userType: "",
  });
  const [selectedUserType, setSelectedUserType] = useState<string>("");

  const usersTypes = useMemo(
    () => [
      { label: "Estudiante", value: "estudiante" },
      { label: "Docente", value: "docente" },
      { label: "Profesional", value: "profesional" },
      { label: "Otro", value: "otro" },
    ],
    []
  );

  const { error, loading, register, success, openErrorModal, closeErrorModal } =
    useRegister();

  const handleSend = () => {
    register({ ...registerForm, userType: selectedUserType });
  };

  return (
    <View style={styles.container}>
      {success && <SuccessModal />}
      <ErrorModal close={closeErrorModal} error={error} open={openErrorModal} />
      <Loading open={loading} />
      <ScrollView style={styles.formContainer}>
        <TextInput
          onChange={(e) =>
            setRegisterForm({ ...registerForm, name: e.nativeEvent.text })
          }
          placeholder="Nombre completo"
          style={stylesLogin.input}
        />
        <Text style={styles.descriptionLabel}>Ingrese nombres y apellidos</Text>
        <TextInput
          onChange={(e) =>
            setRegisterForm({ ...registerForm, email: e.nativeEvent.text })
          }
          placeholder="Correo"
          style={stylesLogin.input}
        />
        <Text style={styles.descriptionLabel}>Ingrese correo electrónico</Text>
        <TextInput
          onChange={(e) =>
            setRegisterForm({ ...registerForm, password: e.nativeEvent.text })
          }
          placeholder="Contraseña"
          style={stylesLogin.input}
          secureTextEntry={true}
        />
        <Text style={styles.descriptionLabel}>Contraseña</Text>
        <TextInput
          onChange={(e) =>
            setRegisterForm({ ...registerForm, age: e.nativeEvent.text })
          }
          value={registerForm.age.toString()}
          placeholder="Edad"
          style={stylesLogin.input}
          keyboardType="numeric"
        />
        <Text style={styles.descriptionLabel}>Ingrese su edad en numero</Text>

        <TextInput
          onChange={(e) =>
            setRegisterForm({ ...registerForm, phone: e.nativeEvent.text })
          }
          value={registerForm.phone.toString()}
          placeholder="Teléfono"
          style={stylesLogin.input}
          keyboardType="numeric"
        />
        <Text style={styles.descriptionLabel}>
          Ingrese su numero de teléfono
        </Text>
        <Text
          style={{
            ...stylesLogin.input,
            padding: 10,
            height: 50,
          }}
        >
          Tipo de usuario
        </Text>
        {usersTypes.map((userType, index) => (
          <View key={index} style={styles.userTypeSelector}>
            <Text key={index} style={styles.userTypeLabel}>
              {userType.label}
            </Text>
            {userType.value === selectedUserType ? (
              <TouchableOpacity
                style={styles.noFillCheckBox}
                onPress={() => setSelectedUserType(userType.value)}
              >
                <View style={styles.fillCheckBox} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.noFillCheckBox}
                onPress={() => setSelectedUserType(userType.value)}
              />
            )}
          </View>
        ))}
        <TouchableOpacity
          style={{
            ...stylesLogin.button,
            backgroundColor: Colors.Danger,
            marginTop: 20,
            marginBottom: 20,
            width: 120,
          }}
          onPress={handleSend}
        >
          <Text style={stylesLogin.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
