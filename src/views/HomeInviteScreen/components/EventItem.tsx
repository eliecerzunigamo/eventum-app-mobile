import React, { useEffect, useState } from "react";
import { View, Image, Text, Dimensions } from "react-native";
import { Events } from "../hooks/useHomeInviteScreen";
import { Connections } from "../../../common/utils/Enums";
import { eventItemStyles as styles } from "./utils/styles";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  event: Events;
}

export const EventItem = ({ event }: Props) => {
  const dimensions = Dimensions.get("window");
  const [size, setSize] = useState({
    width: dimensions.width,
    height: dimensions.width,
  });

  useEffect(() => {
    Image.getSize(`${imagesPath}${event.image_path}`, (width, height) => {
      const ratio = dimensions.width / width;
      const imageHeight = height * ratio;
      const imageWidth = dimensions.width;
      setSize({
        width: imageWidth,
        height: imageHeight,
      });
    });
  }, [event.image_path]);

  const imagesPath = Connections.LocalImage;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${imagesPath}${event.image_path}` }}
        style={{ ...styles.image, ...size }}
      />
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.description}>
          {event.description.slice(0, 130)}...
        </Text>
      </View>
    </View>
  );
};
