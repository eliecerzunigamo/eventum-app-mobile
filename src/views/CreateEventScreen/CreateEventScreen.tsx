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
import { useCreateEvent } from "./hooks/useCreateEvent";
import { Loading } from "../../common/components/Loading/Loading";
import { createEventScreen } from "./utils/styles";

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

  const handleCreateEvent = () => {
    eventValidation()
      ? createEvent({
          title: eventName,
          description: eventDescription,
          date: eventDate.toISOString(),
          image: base64,
          prog: programId!,
          fac: facultyId,
        })
      : Alert.alert("Error", "Por favor, llene todos los campos");
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
      });
  }, [base64]);

  const handleImage = () => {
    launchImageLibrary(
      { mediaType: "photo", includeBase64: true },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else {
          setBase64(
            `data:${response.assets![0].type};base64,` +
              response.assets![0].base64
          );
          setEventImage(response.assets![0].fileName!);
        }
      }
    );
  };

  return (
    <View style={createEventScreen.container}>
      <Loading open={loading} />
      <View
        style={{
          ...HomeStyles.header,
          ...createEventScreen.header,
        }}
      >
        <Text style={createEventScreen.title}>Crear evento</Text>
        <TouchableOpacity
          style={HomeStyles.filterButton}
          onPress={() => navigate.goBack()}
        >
          <Text style={HomeStyles.filterText}>Volver</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={createEventScreen.scrollView}>
        <View style={createEventScreen.scrollViewContent}>
          <Text style={createEventScreen.label}>Nombre del evento</Text>
          <TextInput
            onChange={(e) => {
              setEventName(e.nativeEvent.text);
            }}
            placeholder="Nombre del evento"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={handleImage}
            style={createEventScreen.imageButton}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: "black",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 0,
              }}
            >
              {eventImage.length > 0 ? eventImage : "Seleccionar imagen"}
            </Text>
          </TouchableOpacity>
          {base64.length > 0 && (
            <View
              style={{
                padding: 10,
                marginBottom: 20,
              }}
            >
              <Image
                source={{ uri: base64 }}
                style={{
                  ...size,
                  ...createEventScreen.imageContainer,
                }}
              />
            </View>
          )}

          <Text style={createEventScreen.label}>Descripción del evento</Text>
          <TextInput
            onChange={(e) => {
              setEventDescription(e.nativeEvent.text);
            }}
            style={{
              ...styles.input,
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
            style={{
              ...filtersModalStyles.picker,
              elevation: 0,
              width: "100%",
            }}
          >
            <Picker
              selectedValue={facultyId}
              style={{ height: 50, width: "100%", color: "black" }}
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
          <Text style={createEventScreen.label}>Programa</Text>
          <View
            style={{
              ...filtersModalStyles.picker,
              elevation: 0,
              width: "100%",
            }}
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
          <Text style={createEventScreen.label}>Fecha</Text>
          <TouchableOpacity
            style={createEventScreen.dateButton}
            onPress={() => setOpenDate(true)}
          >
            <Text style={createEventScreen.dateButtonText}>
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
            style={createEventScreen.creationButton}
            onPress={handleCreateEvent}
          >
            <Text style={createEventScreen.creationButtonText}>
              Crear evento
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
