import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStyles as styles } from "../HomeScreen/utils/styles";
import { useIsFocused } from "@react-navigation/native";
import Header from "../../common/components/Header/Header";
import { SidebarContext } from "../../common/context/sidebar/SidebarContext";
import { SidebarTypes } from "../../common/context/sidebar/SideBarTypes";
import { Colors } from "../../common/utils/Enums";
import { useScheduleScreen } from "./hooks/useScheduleScreen";
import { EventItem } from "./components/EventItem";

export const ScheduleScreen = () => {
  const { loading, error, getEvents, events, query } =
    useScheduleScreen();

  const [openFiltersModal, setOpenFiltersModal] = useState(false);
  const [facultyId, setFacultyId] = useState("default");
  const [programId, setProgramId] = useState("default");
  const { dispatch } = useContext(SidebarContext);

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
      <View style={styles.container}>
        <Header
          func={() => {
            dispatch({
              type: SidebarTypes.Open,
              sidebar: {
                open: true,
                sideBarItems: [],
              },
            });
          }}
          title={"Eventos Agendados"}
        />
        {events.length === 0 && (
          <View
            style={{
              ...styles.scrollViewContainer,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="calendar" color={Colors.Danger} size={50} />
            <Text
              style={{
                fontSize: 18,
                color: Colors.Dark,
                textAlign: "center",
                marginTop: 30,
              }}
            >
              Aun no has agregado eventos agendados
            </Text>
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
            }
          }}
        >
          <View style={styles.eventsContainer}>
            {events.map((event, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  navigate.navigate("Details", {
                    event,
                    previousRoute: "Agendado",
                  });
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
