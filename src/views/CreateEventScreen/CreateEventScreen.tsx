import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { HomeStyles } from "../HomeScreen/utils/styles";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "../LoginScreen/utils/styles";
import { Picker } from "@react-native-picker/picker";
import { toTitle } from "../../common/utils/toTitle";
import { filtersModalStyles } from "../HomeScreen/components/utils/styles";
import { Program, useHome } from "../HomeScreen/hooks/useHome";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DatePicker from "react-native-date-picker";
import { useCreateEvent } from './hooks/useCreateEvent';
import { Loading } from '../../common/components/Loading/Loading';

export const CreateEventScreen = () => {

  const { createEvent, error, loading, success } = useCreateEvent();

  const navigate = useNavigation<StackNavigationProp<any>>();
  const { faculties, getFacultiesAndPrograms } = useHome();
  const [facultyId, setFacultyId] = useState("default");
  const [programId, setProgramId] = useState("default");
  const [currentPrograms, setCurrentPrograms] = useState<Program[]>([]);
  const [openDate, setOpenDate] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [eventImage, setEventImage] = useState("");
  const [base64, setBase64] = useState<string>("");

  const eventValidation = () => {
    if (eventName === "") {
      return false;
    }
    if (eventDescription === "") {
      return false;
    }
    if (eventDate === undefined) {
      return false;
    }
    if (facultyId === "default") {
      return false;
    }
    if (programId === "default") {
      return false;
    }
    if (eventImage === "") {
      return false;
    }
    return true;
  };

  useEffect(() => {
    getFacultiesAndPrograms();
  }, []);

  useEffect(() => {
    const selectedPrograms = faculties.find((item) => {
      return item.name === facultyId;
    })?.programs;
    setCurrentPrograms(selectedPrograms ? selectedPrograms : []);
    setProgramId("default");
  }, [facultyId]);

  useEffect(() => {
    if (success) {
      Alert.alert("Evento creado con éxito");
      navigate.navigate("Home");
    }
  }, [success]);

  const [size, setSize] = useState({
    width: 100,
    height: 100,
  });

  useEffect(() => {
    if (base64.length > 0)
      Image.getSize(base64, (width, height) => {
        const aspectRatio = width / height;
        setSize({
          width: 200 * aspectRatio,
          height: 200,
        });
        ;
      });
  }, [base64]);


  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F2561D",
        paddingBottom: 20,
      }}
    >
      <Loading
        open={loading}
      />
      <View
        style={{
          ...HomeStyles.header,
          justifyContent: "space-between",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Crear evento</Text>
        <TouchableOpacity
          style={HomeStyles.filterButton}
          onPress={() => navigate.goBack()}
        >
          <Text style={HomeStyles.filterText}>Volver</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          padding: 20,
        }}
      >
        <View
          style={{
            paddingBottom: 50,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Nombre del evento
          </Text>
          <TextInput
            onChange={(e) => {
              setEventName(e.nativeEvent.text);
            }}
            placeholder="Nombre del evento"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => {
              launchImageLibrary(
                { mediaType: "photo", includeBase64: true },
                (response) => {
                  if (response.didCancel) {
                    console.log("User cancelled image picker");
                  } else {
                    setBase64(`data:${response.assets![0].type};base64,` + response.assets![0].base64);
                    setEventImage(response.assets![0].fileName!);
                  }
                }
              );
            }}
            style={{
              marginTop: 20,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "black",
              padding: 10,
              backgroundColor: 'white',
            }}
          >
            <Text style={{
              ...styles.buttonText, color: 'auto',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 0,

            }}>{eventImage.length > 0 ? eventImage : 'Seleccionar imagen'}</Text>
          </TouchableOpacity>
         { base64.length > 0 && <View
            style={{
              padding: 10,
              marginBottom: 20,
            }}
          >
            <Image
              source={{ uri: base64 }}
              style={{
                ...size,
                alignSelf: "center",
                borderWidth: 5,
                borderColor: "white",
                backgroundColor: "white",
              }}
            />
          </View>}

          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            Descripción del evento
          </Text>
          <TextInput
            onChange={(e) => {
              setEventDescription(e.nativeEvent.text);
            }}
            style={{
              ...styles.input,
              width: "80%",
              height: 150,
              alignItems: "flex-start",
              textAlignVertical: "top",
            }}
            underlineColorAndroid="transparent"
            placeholder="Descripción del evento"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Facultad
          </Text>
          <View
            style={{ ...filtersModalStyles.picker, backgroundColor: "white" }}
          >
            <Picker
              selectedValue={facultyId}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue: string, itemIndex) =>
                setFacultyId(itemValue)
              }
            >
              {facultyId === "default" && (
                <Picker.Item
                  style={{
                    fontSize: 12.5,
                  }}
                  key={"default"}
                  label={toTitle("Seleccione un programa")}
                  value={"default"}
                />
              )}
              {faculties.map((faculty) => (
                <Picker.Item
                  style={{
                    fontSize: 12.5,
                  }}
                  key={faculty._id}
                  label={toTitle(faculty.name)}
                  value={faculty.name}
                />
              ))}
            </Picker>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Programa
          </Text>
          <View
            style={{ ...filtersModalStyles.picker, backgroundColor: "white" }}
          >
            <Picker
              selectedValue={programId}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue: string, itemIndex) =>
                setProgramId(itemValue)
              }
            >
              {programId === "default" && (
                <Picker.Item
                  style={{
                    fontSize: 12.5,
                  }}
                  key={"default"}
                  label={toTitle("Seleccione un programa")}
                  value={"default"}
                />
              )}
              {currentPrograms.map((program) => (
                <Picker.Item
                  style={{
                    fontSize: 12,
                  }}
                  key={program.id}
                  label={toTitle(program.name)}
                  value={program.name}
                />
              ))}
            </Picker>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Fecha
          </Text>
          <TouchableOpacity
            style={{
              width: "50%",
              marginTop: 10,
              backgroundColor: "#551700ac",
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
            }}
            onPress={() => setOpenDate(true)}
          >
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
              }}
             
            >
              {eventDate.toLocaleString("es-ES")}
            </Text>
          </TouchableOpacity>
          <DatePicker
            title={"Seleccione una fecha"}
            modal
            open={openDate}
            date={eventDate}
            onConfirm={(date) => {
              setOpenDate(false);
              setEventDate(date);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
          <TouchableOpacity
            style={{
              ...HomeStyles.filterButton,
              marginTop: 50,
              width: 150,
              height: 50,
              justifyContent: "center",
              backgroundColor: "#1f1f1f",
            }}
            onPress={() => {
              eventValidation() ?
                createEvent({
                  title: eventName,
                  description: eventDescription,
                  date: eventDate.toISOString(),
                  image: base64,
                  prog: programId!,
                  fac: facultyId,
                }) :
                Alert.alert("Error", "Por favor, llene todos los campos");
            }
            }
          >
            <Text
              style={{
                ...HomeStyles.filterText,
                fontSize: 14,
                color: "#ffffff",
              }}
            >
              Crear evento
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
