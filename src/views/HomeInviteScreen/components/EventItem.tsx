import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Events } from "../hooks/useHomeInviteScreen";
import { Connections } from "../../../common/utils/Enums";
import { eventItemStyles as styles } from "./utils/styles";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  event: Events;
}

export const EventItem = ({ event }: Props) => {
  const imagesPath = Connections.LocalImage;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${imagesPath}${event.image_path}` }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>
          {event.description.slice(0, 130)}...
        </Text>
        <View style={styles.timeContainer}>
          <View style={styles.hourContainer}>
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
              {event.time}
            </Text>
            <Icon name="clock-o" size={12} color="white" />
          </View>
          <View style={styles.dateContainer}>
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
              {String(event.date)}
            </Text>
            <Icon name="calendar" size={12} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
};
