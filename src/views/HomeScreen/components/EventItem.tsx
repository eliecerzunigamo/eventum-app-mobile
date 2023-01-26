import React, { useEffect, useState } from "react";
import { View, Image, Text, Dimensions } from "react-native";
import { Connections, Colors } from "../../../common/utils/Enums";
import Icon from "react-native-vector-icons/AntDesign";
import { eventItemStyles as styles } from "../../HomeInviteScreen/components/utils/styles";
import { Events } from "../../HomeInviteScreen/hooks/useHomeInviteScreen";

interface Props {
  event: Events;
  isFavorite?: boolean;
}

export const EventItem = ({ event, isFavorite }: Props) => {
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
      <View
        style={{
          ...styles.textContainer,
          width: size.width,
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <Text style={{ ...styles.description, width: "90%" }}>
          {event.description.slice(0, 130)}...
        </Text>
        <View
          style={{
            width: "8%",
            height: 30,
            borderRadius: 5,
            backgroundColor: Colors.Green,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isFavorite ? (
            <Icon name="heart" size={20} color={Colors.Light} />
          ) : (
            <Icon name="hearto" size={20} color={Colors.Light} />
          )}
        </View>
      </View>
    </View>
  );
};
