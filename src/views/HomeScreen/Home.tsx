import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
} from "react-native";
import { useHome } from "./hooks/useHome";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { FiltersModal } from "./components/FiltersModal";
import { HomeStyles as styles } from "./utils/styles";
import { useIsFocused } from "@react-navigation/native";
import { useInitSidebar } from "./hooks/useInitSidebar";
import Header from "../../common/components/Header/Header";
import { SidebarContext } from "../../common/context/sidebar/SidebarContext";
import { SidebarTypes } from "../../common/context/sidebar/SideBarTypes";
import EmptyMessage from "./components/EmptyMessage";
import SearchBar from "../../common/components/SearchBar/SearchBar";
import { EventItem } from "./components/EventItem";
import { useFavoriteScreen } from "../FavoriteScreen/hooks/useFavoriteScreen";
import { BackHandler } from "react-native";

const Home = () => {
  const { getEvents, setQuery, query, events } = useHome();
  const { dispatch } = useContext(SidebarContext);
  const { getEvents: getFavEvents, events: favEvents } = useFavoriteScreen();

  const [openFiltersModal, setOpenFiltersModal] = useState(false);
  const [facultyId, setFacultyId] = useState("default");
  const [programId, setProgramId] = useState("default");
  const [eventType, setEventType] = useState("default");

  const isFocused = useIsFocused();

  useEffect(() => {
    getEvents(10, facultyId, programId, true, query, eventType);
    getFavEvents(10, facultyId, programId, true, query);
  }, [programId, facultyId, eventType]);

  useInitSidebar(setOpenFiltersModal, isFocused);

  useEffect(() => {
    if (isFocused) {
      getEvents(10, facultyId, programId, true, query, eventType);
      getFavEvents(10, facultyId, programId, true, query);
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
        title={"EventUM"}
      />
      <SearchBar setQuery={setQuery} />
      <FiltersModal
        openFiltersModal={openFiltersModal}
        setOpenFiltersModal={setOpenFiltersModal}
        setFacultyId={setFacultyId}
        setProgramId={setProgramId}
        setEventType={setEventType}
        selectedEventType={eventType}
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
                getEvents(10, facultyId, programId, true, query, eventType);
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
              getEvents(10, facultyId, programId, false, query, eventType);
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
                    previousRoute: "Home",
                  });
                }}
              >
                <View>
                  <EventItem
                    key={index}
                    event={event}
                    isFavorite={favEvents.some(
                      (favEvent) => event._id === favEvent._id
                    )}
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

export default Home;
