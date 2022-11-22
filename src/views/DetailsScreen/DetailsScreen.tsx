import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Connections } from "../../common/utils/Enums";
import { Events } from "../HomeInviteScreen/hooks/useHomeInviteScreen";
import { HomeStyles } from "../HomeScreen/utils/styles";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { eventItemStyles } from "../HomeInviteScreen/components/utils/styles";
import { toTitle } from "../../common/utils/toTitle";
import { detailsScreenStyles as styles } from "./utils/styles";
import { useDetailsScreen } from "./hooks/useDetailsScreen";

interface Props {
  route?: {
    params: {
      event: Events;
    };
  };
}

export const DetailsScreen = ({ route }: Props) => {
  const imagesPath = Connections.LocalImage;
  const { title, description, date, time, __v, _id, fac, image_path, prog } =
    route!.params.event;
  const navigation = useNavigation<StackNavigationProp<any>>();

  const {
    addFavoriteEvent,
    deleteFavoriteEvent,
    getFavoriteEvent,
    event,
    loading,
  } = useDetailsScreen();

  useEffect(() => {
    getFavoriteEvent(_id);
  }, []);

  const [size, setSize] = useState({
    width: 100,
    height: 100,
  });

  useEffect(() => {
    Image.getSize(`${imagesPath}${image_path}`, (width, height) => {
      const aspectRatio = width / height;
      setSize({
        width: 230 * aspectRatio,
        height: 230, 
      });
    });
  },[image_path]);

  


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, fontWeight:'normal'}}>Detalles</Text>
        <TouchableOpacity
          style={HomeStyles.filterButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={HomeStyles.filterText}>Atrás</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          width: "100%",
        }}
      >
        <View style={styles.body}>
          <Text style={styles.title}>{toTitle(title)}</Text>
          <Image
            
            source={{ uri: `${imagesPath}${image_path}` }}
            style={{...styles.image, ...size, marginTop: 10}}
          />
          {!event?.isFav ? (
            <TouchableOpacity
              onPress={() => {
                addFavoriteEvent(_id);
              }}
              style={styles.favButton}
            >
              <Text style={styles.favButtonText}>Añadir a favoritos</Text>
              <Icon name="star-o" size={20} color={"#3b3b3b"} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                deleteFavoriteEvent(_id);
              }}
              style={styles.removeFavButton}
            >
              <Text style={styles.removeButtonText}>Remover de favoritos</Text>
              <Icon name="remove" size={20} color={"#ffffff"} />
            </TouchableOpacity>
          )}
          <View style={styles.eventInfoContainer}>
            <View style={{ ...eventItemStyles.hourContainer, width: 85 }}>
              <Text style={{ fontWeight: "bold", color: "#fff" }}>Hora: </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: 12,
                }}
              >
                {time}
              </Text>
              <Icon name="clock-o" size={12} color={"#fff"} />
            </View>
            <View style={{ ...eventItemStyles.dateContainer, width: 130 }}>
              <Text style={{ fontWeight: "bold", color: "#fff" }}>Fecha: </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: 12,
                }}
              >
                {String(date)}
              </Text>
              <Icon name="calendar" size={12} color={"#fff"} />
            </View>
          </View>
          <View style={styles.hourContainer}>
            <View>
              <Text style={{ fontWeight: "bold", color: "#fff" }}>
                Facultad:{" "}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#fff",
                }}
              >
                {toTitle(fac)}
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", color: "#fff" }}>
                Programa:{" "}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#fff",
                }}
              >
                {toTitle(prog)}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 13,
              color: "#fff",
              marginTop: 20,
              paddingBottom: 20,
            }}
          >
            {description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
