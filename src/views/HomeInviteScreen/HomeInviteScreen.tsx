import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useHomeInviteScreen } from "./hooks/useHomeInviteScreen";
import { EventItem } from "./components/EventItem";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { homeInviteScreenStyles as styles } from "./utils/styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../common/utils/Enums";
import { StackNavigationProp } from "@react-navigation/stack";

export const HomeInviteScreen = () => {
  const { loading, getEvents, events, getInitialEvents, setQuery, query } =
    useHomeInviteScreen();

  useEffect(() => {
    getInitialEvents();
  }, []);

  const navigate = useNavigation<StackNavigationProp<any>>();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getEvents(20, query);
    }
  }, [isFocused]);

  return (
    <View>
      <View style={styles.scrollViewContainer}>
        <Icon
          style={{
            position: "absolute",
            left: 10,
            top: 10,
            zIndex: 1,
          }}
          name="search"
          size={17}
          color={Colors.Dark}
        />
        <TextInput
          placeholderTextColor={Colors.Dark}
          style={styles.searchInput}
          placeholder={"Buscar"}
          onChangeText={(text) => setQuery(text)}
        ></TextInput>
        {events.length === 0 && (
          <View
            style={{
              ...styles.scrollViewContainer,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text style={styles.emptyText}>Aun no se han creado eventos</Text>
            <Icon name="calendar" color={"#1d1d1d"} size={50} />
          </View>
        )}
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                getInitialEvents();
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
              getEvents(20, query);
            }
          }}
        >
          <View style={styles.eventItemContainer}>
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
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Inicie sesión para acceder a todas las funcionalidades
        </Text>
      </View>
    </View>
  );
};
