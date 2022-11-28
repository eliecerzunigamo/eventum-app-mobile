import { Header } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { EventItem } from "../HomeInviteScreen/components/EventItem";
import { useHome } from "./hooks/useHome";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { FiltersModal } from "./components/FiltersModal";
import { HomeStyles as styles } from "./utils/styles";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "../../common/utils/Enums";

const Home = () => {
  const { loading, error, getEvents, events, setQuery, query } = useHome();

  const [openFiltersModal, setOpenFiltersModal] = useState(false);
  const [facultyId, setFacultyId] = useState("default");
  const [programId, setProgramId] = useState("default");

  useEffect(() => {
    getEvents(20, facultyId, programId, true, query);
  }, [programId, facultyId]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getEvents(20, facultyId, programId, true, query);
    }
  }, [isFocused]);

  const navigate = useNavigation<StackNavigationProp<any>>();

  return (
    <View>
      <FiltersModal
        openFiltersModal={openFiltersModal}
        setOpenFiltersModal={setOpenFiltersModal}
        setFacultyId={setFacultyId}
        setProgramId={setProgramId}
        selectedFaculty={facultyId}
        selectedProgram={programId}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="search" size={17} color={"#3a3a3a"} />
          <TextInput
            placeholderTextColor={Colors.Blue}
            style={styles.title}
            placeholder={"Buscar"}
            onChangeText={(text) => setQuery(text)}
          ></TextInput>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              setOpenFiltersModal(true);
            }}
          >
            <Text style={styles.filterText}>Filtros</Text>
            <Icon name="bars" size={16} />
          </TouchableOpacity>
        </View>
        {events.length === 0 && (
          <View
            style={{
              ...styles.scrollViewContainer,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#ffffff",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 30,
              }}
            >
              Aun no se han creado eventos
            </Text>
            <Icon name="calendar" color={"#1d1d1d"} size={50} />
          </View>
        )}
        <ScrollView
          style={styles.scrollViewContainer}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                getEvents(20, facultyId, programId, true, query);
              }}
            />
          }
          onMomentumScrollEnd={(e) => {
            const scrollPosition = e.nativeEvent.contentOffset.y;
            const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
            const contentHeight = e.nativeEvent.contentSize.height;
            const isEndReached =
              scrollViewHeight + scrollPosition >= contentHeight - 200;
            if (isEndReached) {
              getEvents(20, facultyId, programId, false, query);
              console.log("scroll");
            }
          }}
        >
          <View style={styles.eventsContainer}>
            {events.map((event, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  navigate.navigate("Details", { event });
                }}
              >
                <View>
                  <EventItem key={index} event={event} />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
