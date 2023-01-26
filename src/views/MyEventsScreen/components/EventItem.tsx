import React, { useEffect, useState, useContext } from "react";
import { View, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import { Connections, Colors } from "../../../common/utils/Enums";
import Icon from "react-native-vector-icons/Feather";
import { eventItemStyles as styles } from "../../HomeInviteScreen/components/utils/styles";
import { Events } from "../../HomeInviteScreen/hooks/useHomeInviteScreen";
import { LoginContext } from "../../../common/context/login/LoginContext";
import { useMyEvents } from "../hooks/useMyEvents";
import { Loading } from "../../../common/components/Loading/Loading";

interface Props {
  event: Events;
  getEvent: () => void;
}

export const EventItem = ({ event, getEvent }: Props) => {
  const dimensions = Dimensions.get("window");

  const { deleteEvent, loading } = useMyEvents(false);

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
    <>
      <Loading open={loading} />
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
          <Text style={{ ...styles.description, width: "80%" }}>
            {event.description.slice(0, 130)}...
          </Text>

          <TouchableOpacity
            onPress={async () => {
              const success = await deleteEvent(event._id);
              if (success) {
                console.log(success);
                getEvent();
              }
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 5,
                backgroundColor: Colors.Orange,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="trash-2" size={20} color={Colors.Light} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
