import { Header } from "@react-navigation/elements";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { FiltersModal } from "../HomeScreen/components/FiltersModal";
import Icon from "react-native-vector-icons/FontAwesome";
import { EventItem } from "../HomeInviteScreen/components/EventItem";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStyles as styles } from "../HomeScreen/utils/styles";
import { useFavoriteScreen } from "./hooks/useFavoriteScreen";
import { useIsFocused } from "@react-navigation/native";

export const FavoriteScreen = () => {
  const { loading, error, getEvents, events, setQuery, query } =
    useFavoriteScreen();

  const [openFiltersModal, setOpenFiltersModal] = useState(false);
  const [facultyId, setFacultyId] = useState("default");
  const [programId, setProgramId] = useState("default");

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getEvents(20, facultyId, programId, true, query);
    }
  }, [isFocused]);

  useEffect(() => {
    getEvents(20, facultyId, programId, true, query);
  }, [programId, facultyId]);

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
            placeholderTextColor={"#9c9c9c"}
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
              Aun no has agregado eventos favoritos
            </Text>
            <Icon name="star" color={"yellow"} size={50} />
          </View>
        )}
        <ScrollView
          style={styles.scrollViewContainer}
          refreshControl={
            <RefreshControl
              refreshing={loading}
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
