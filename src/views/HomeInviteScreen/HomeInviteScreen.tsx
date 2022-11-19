import { Header } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useHomeInviteScreen } from "./hooks/useHomeInviteScreen";
import { EventItem } from "./components/EventItem";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { homeInviteScreenStyles as styles } from "./utils/styles";

export const HomeInviteScreen = () => {
  const navigate = useNavigation<StackNavigationProp<any>>();

  const { error, loading, getEvents, events, getInitialEvents } =
    useHomeInviteScreen();

  useEffect(() => {
    getInitialEvents();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Últimos eventos</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate.push("Login")}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollViewContainer}>
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
              scrollViewHeight + scrollPosition >= contentHeight - 100;
            if (isEndReached) {
              getEvents(7);
              console.log("scroll");
            }
          }}
        >
          <View style={styles.eventItemContainer}>
            {events.map((event, index) => (
              <EventItem key={index} event={event} />
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
