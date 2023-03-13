import React, { useState, useEffect, useMemo, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { styles } from "../LoginScreen/utils/styles";
import { Program, useHome } from "../HomeScreen/hooks/useHome";
import { launchImageLibrary } from "react-native-image-picker";
import { useCreateEvent } from "./hooks/useCreateEvent";
import { Loading } from "../../common/components/Loading/Loading";
import { createEventScreen } from "./utils/styles";
import { styles as registerStyles } from "../RegisterScreen/utils/styles";
import Select from "./components/Select";
import CustomDatePicker from "./components/CustomDatePicker";
import Icon from "react-native-vector-icons/Feather";
import { Colors } from "../../common/utils/Enums";
import Base64Image from "./components/Base64Image";
import CustomPicker from "./components/CustomPicker";
import { ErrorModal } from "../RegisterScreen/components/ErrorModal";
import Header from "../../common/components/Header/Header";
import { SidebarContext } from "../../common/context/sidebar/SidebarContext";
import { SidebarTypes } from "../../common/context/sidebar/SideBarTypes";
import moment from "moment";

export const CreateEventScreen = () => {
  const {
    createEvent,
    loading,
    success,
    closeErrorModal,
    error,
    openErrorModal,
  } = useCreateEvent();

  const { dispatch } = useContext(SidebarContext);

  const { faculties, getFacultiesAndPrograms } = useHome();
  const [facultyId, setFacultyId] = useState("default");
  const [programId, setProgramId] = useState("default");
  const [currentPrograms, setCurrentPrograms] = useState<Program[]>([]);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [eventEndDate, setEventEndDate] = useState<Date>(new Date());
  const [base64, setBase64] = useState<string>("");
  const [selectedEventType, setSelectedEventType] = useState<string>("");
  const [eventPlace, setEventPlace] = useState<string>("");
  const [haveEndDate, setHaveEndDate] = useState<string>("");

  const handleCreateEvent = () => {
    const notice = {
      title: eventName,
      description: eventDescription,
      image: base64,
      event_type: selectedEventType,
      prog: programId!,
      fac: facultyId,
    };

    const event = {
      title: eventName,
      description: eventDescription,
      image: base64,
      init_date: eventDate.toISOString(),
      end_date: haveEndDate.length > 0 && eventEndDate.toISOString(),
      prog: programId!,
      fac: facultyId,
      event_type: selectedEventType,
      place: eventPlace,
    };
    createEvent(selectedEventType === "new" ? notice : event);
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
    }
  }, [success]);

  const [size, setSize] = useState({
    width: 100,
    height: 100,
  });
  useEffect(() => {
    const dimensions = Dimensions.get("window");
    if (base64.length > 0)
      Image.getSize(base64, (width, height) => {
        const ratio = dimensions.width / width;
        const imageHeight = height * ratio;
        const imageWidth = dimensions.width;
        setSize({
          width: imageWidth,
          height: imageHeight,
        });
      });
  }, [base64]);

  const eventTypes = useMemo(
    () => [
      { label: "Evento", value: "event" },
      { label: "Noticia", value: "new" },
    ],
    []
  );

  const handleDateChange = (date: Date) => {
    const time = date.getTime();
    const adjust = 1000 * 60 * 60 * 5;
    const newDate = new Date(time - adjust);
    return newDate;
  };

  const handleImage = () => {
    launchImageLibrary(
      { mediaType: "photo", includeBase64: true },
      (response) => {
        if (response.didCancel) {
        } else {
          setBase64(
            `data:${response.assets![0].type};base64,` +
              response.assets![0].base64
          );
        }
      }
    );
  };

  return (
    <>
      <Loading open={loading} />
      <View style={createEventScreen.container}>
        <Header
          func={() => {
            dispatch({
              type: SidebarTypes.Open,
            });
          }}
          title="Crear evento"
          previousRoute="Home"
        />
        <ErrorModal
          close={closeErrorModal}
          error={error}
          open={openErrorModal}
        />
        <ScrollView style={createEventScreen.scrollView}>
          <View style={createEventScreen.scrollViewContent}>
            <Text style={registerStyles.userTypeLabel}>Tipo:</Text>
            {eventTypes.map((eventType, index) => (
              <View key={index}>
                <Select
                  optionLabel={eventType.label}
                  optionValue={eventType.value}
                  selectedValue={selectedEventType}
                  setSelectedValue={setSelectedEventType}
                />
              </View>
            ))}
            <TextInput
              onChange={(e) => {
                setEventName(e.nativeEvent.text);
              }}
              placeholder="Titulo"
              style={styles.input}
            />
            <Text style={registerStyles.descriptionLabel}>
              Ingrese un titulo
            </Text>
            <TextInput
              onChange={(e) => {
                setEventDescription(e.nativeEvent.text);
              }}
              style={{
                ...styles.input,
                height: 80,
                alignItems: "flex-start",
                textAlignVertical: "top",
              }}
              underlineColorAndroid="transparent"
              placeholder="Detalle"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
            />
            <Text style={registerStyles.descriptionLabel}>
              Ingrese una descripción del evento
            </Text>
            {selectedEventType === "event" && (
              <>
                <CustomDatePicker
                  dateLabel={moment(eventDate).format("YYYY/MM/DD")}
                  datePickerLabel={"Fecha inicio"}
                  selectedDate={eventDate}
                  setDate={setEventDate}
                  dateModalTitle={"Seleccione una fecha"}
                  optionValue="date"
                  selectedValue="date"
                  setSelectedValue={() => {}}
                  dateModalMode="date"
                />
                <CustomDatePicker
                  dateLabel={moment(eventEndDate).format("YYYY/MM/DD")}
                  datePickerLabel={"Fecha fin"}
                  selectedDate={eventEndDate}
                  setDate={setEventEndDate}
                  dateModalTitle={"Seleccione una fecha"}
                  dateModalMode="date"
                  selectedValue={haveEndDate}
                  optionValue="final_date"
                  setSelectedValue={setHaveEndDate}
                />
                <CustomDatePicker
                  dateLabel={moment(eventDate).format("HH:mm")}
                  datePickerLabel={"Hora inicio"}
                  selectedDate={eventDate}
                  setDate={setEventDate}
                  dateModalTitle={"Seleccione una hora"}
                  dateModalMode="time"
                  optionValue="date"
                  selectedValue="date"
                  setSelectedValue={() => {}}
                />
                <CustomDatePicker
                  dateLabel={moment(eventEndDate).format("HH:mm")}
                  datePickerLabel={"Hora fin"}
                  selectedDate={eventEndDate}
                  setDate={setEventEndDate}
                  dateModalTitle={"Seleccione una hora"}
                  dateModalMode="time"
                  selectedValue={haveEndDate}
                  optionValue="final_date"
                  setSelectedValue={() => {}}
                />
                <TextInput
                  onChange={(e) => {
                    setEventPlace(e.nativeEvent.text);
                  }}
                  placeholder="Lugar"
                  style={{ ...styles.input, marginTop: 10, marginBottom: 10 }}
                />
                <Text style={registerStyles.descriptionLabel}>
                  Ingrese el lugar del evento
                </Text>
              </>
            )}

            <CustomPicker
              defaultValue="Facultad"
              selectedValue={facultyId}
              setSelectedValue={setFacultyId}
              values={faculties}
            />

            <CustomPicker
              defaultValue="Programa"
              selectedValue={programId}
              setSelectedValue={setProgramId}
              values={currentPrograms}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={registerStyles.userTypeLabel}>Afiche:</Text>
                <Text
                  style={{ ...registerStyles.descriptionLabel, marginLeft: 0 }}
                >
                  Archivo en .JPG o .PNG
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleImage}
                style={{
                  ...styles.input,
                  width: "auto",
                  height: "auto",
                  padding: 10,
                }}
              >
                <Icon name="upload" size={20} color={Colors.Orange} />
              </TouchableOpacity>
            </View>
            {base64.length > 0 && <Base64Image base64={base64} size={size} />}
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: Colors.Orange,
                height: 50,
                width: 100,
                marginTop: 10,
              }}
              onPress={handleCreateEvent}
            >
              <Text
                style={{
                  ...styles.buttonText,
                }}
              >
                Crear
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
