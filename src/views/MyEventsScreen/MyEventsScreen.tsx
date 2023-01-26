import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
} from "react-native";
import { useMyEvents } from "./hooks/useMyEvents";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { FiltersModal } from "../HomeScreen/components/FiltersModal";
import { HomeStyles as styles } from "../HomeScreen/utils/styles";
import { useIsFocused } from "@react-navigation/native";
import Header from "../../common/components/Header/Header";
import { SidebarContext } from "../../common/context/sidebar/SidebarContext";
import { SidebarTypes } from "../../common/context/sidebar/SideBarTypes";
import SearchBar from "../../common/components/SearchBar/SearchBar";
import { EventItem } from "./components/EventItem";
import { useFavoriteScreen } from "../FavoriteScreen/hooks/useFavoriteScreen";
import { useInitSidebar } from "../HomeScreen/hooks/useInitSidebar";
import EmptyMessage from "../HomeScreen/components/EmptyMessage";

const MyEvents = () => {
  const { getEvents, setQuery, query, events } = useMyEvents();
  const { dispatch } = useContext(SidebarContext);

  const [openFiltersModal, setOpenFiltersModal] = useState(false);
  const [facultyId, setFacultyId] = useState("default");
  const [programId, setProgramId] = useState("default");

  const isFocused = useIsFocused();

  useEffect(() => {
    getEvents(10, facultyId, programId, true, query);
  }, [programId, facultyId]);

  useEffect(() => {
    setFacultyId("default");
    setProgramId("default");
  }, [isFocused]);

  useInitSidebar(setOpenFiltersModal, isFocused);

  useEffect(() => {
    if (isFocused) {
      getEvents(10, facultyId, programId, true, query);
    }
  }, [isFocused]);

  const navigate = useNavigation<StackNavigationProp<any>>();

  return (
    <View
      style={{
        paddingBottom: 200,
      }}
    >
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
        title={"Mis Eventos"}
      />
      <SearchBar setQuery={setQuery} />
      <FiltersModal
        openFiltersModal={openFiltersModal}
        setOpenFiltersModal={setOpenFiltersModal}
        setFacultyId={setFacultyId}
        setProgramId={setProgramId}
        selectedFaculty={facultyId}
        selectedProgram={programId}
      />
      <View>
        <ScrollView
          style={styles.scrollViewContainer}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                getEvents(10, facultyId, programId, true, query);
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
              getEvents(10, facultyId, programId, false, query);
            }
          }}
        >
          {events.length === 0 && <EmptyMessage />}
          <View style={styles.eventsContainer}>
            {events.map((event, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  navigate.navigate("Details", {
                    event,
                    previousRoute: "MyEvents",
                  });
                }}
              >
                <View>
                  <EventItem
                    key={index}
                    event={event}
                    getEvent={() => {
                      getEvents(10, facultyId, programId, true, query);
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MyEvents;
