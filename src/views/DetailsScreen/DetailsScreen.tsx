import React, { useEffect } from "react";
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
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
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
          padding: 10,
        }}
      >
        <View style={styles.body}>
          <Image
            source={{ uri: `${imagesPath}${image_path}` }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.favButton}>
            <Text style={styles.favButtonText}>Añadir a favoritos</Text>
            <Icon name="star-o" size={20} color={"#3b3b3b"} />
          </TouchableOpacity>
          <View style={styles.eventInfoContainer}>
            <View style={eventItemStyles.hourContainer}>
              <Text style={{ fontWeight: "bold" }}>Hora: </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#0f0f0f",
                }}
              >
                {time}
              </Text>
              <Icon name="clock-o" size={16} color={"#000000"} />
            </View>
            <View style={{ ...eventItemStyles.dateContainer, width: 150 }}>
              <Text style={{ fontWeight: "bold" }}>Fecha: </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#070707",
                }}
              >
                {String(date)}
              </Text>
              <Icon name="calendar" size={16} color={"#000000"} />
            </View>
          </View>
          <View style={styles.hourContainer}>
            <View>
              <Text style={{ fontWeight: "bold" }}>Facultad: </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#030303",
                }}
              >
                {toTitle(fac)}
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold" }}>Programa: </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                {toTitle(prog)}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 13,
              color: "#000000",
              marginTop: 20,
            }}
          >
            {description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
