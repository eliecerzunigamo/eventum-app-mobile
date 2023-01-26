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
          justifyContent: "flex-end",
          width: size.width,
        }}
      >
        <Text style={{ ...styles.description }}>
          {event.description.slice(0, 130)}...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            height: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Colors.Dark,
              fontSize: 12,
              fontWeight: "bold",
              width: "100%",
              textAlign: "right",
            }}
          >
            {String(event.init_date).replace(/-/g, "/")} - {event.init_time}
          </Text>
        </View>
      </View>
    </View>
  );
};
