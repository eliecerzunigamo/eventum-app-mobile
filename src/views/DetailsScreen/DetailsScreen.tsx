import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Connections, Colors } from "../../common/utils/Enums";
import { Events } from "../HomeInviteScreen/hooks/useHomeInviteScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { eventItemStyles } from "../HomeInviteScreen/components/utils/styles";
import { toTitle } from "../../common/utils/toTitle";
import { detailsScreenStyles as styles } from "./utils/styles";
import { useDetailsScreen } from "./hooks/useDetailsScreen";
import { LoginContext } from "../../common/context/login/LoginContext";
import { styles as loginStyles } from "../../views/LoginScreen/utils/styles";
import EventDetails from "./components/EventDetails";
import Header from "../../common/components/Header/Header";
import { SidebarContext } from "../../common/context/sidebar/SidebarContext";
import { SidebarTypes } from "../../common/context/sidebar/SideBarTypes";
import { Loading } from "../../common/components/Loading/Loading";

interface Props {
  route?: {
    params: {
      event: Events;
      previousRoute: string;
    };
  };
}

export const DetailsScreen = ({ route }: Props) => {
  const imagesPath = Connections.LocalImage;
  const {
    title,
    description,
    _id,
    image_path,
    end_date,
    end_time,
    init_date,
    init_time,
    event_type,
    place,
  } = route!.params.event;

  const { auth } = useContext(LoginContext);
  const {
    addFavoriteEvent,
    deleteFavoriteEvent,
    getFavoriteEvent,
    event,
    addScheduleEvent,
    deleteScheduleEvent,
    getScheduleEvent,
    isSchedule,
    loadingChange,
  } = useDetailsScreen();

  const { dispatch } = useContext(SidebarContext);

  useEffect(() => {
    getFavoriteEvent(_id);
    getScheduleEvent(_id);
  }, []);

  const dimensions = Dimensions.get("window");
  const [size, setSize] = useState({
    width: dimensions.width,
    height: dimensions.width,
  });

  useEffect(() => {
    Image.getSize(`${imagesPath}${image_path}`, (width, height) => {
      const ratio = dimensions.width / width;
      const imageHeight = height * ratio;
      const imageWidth = dimensions.width;
      setSize({
        width: imageWidth,
        height: imageHeight,
      });
    });
  }, [image_path]);

  return (
    <View style={styles.container}>
      <Loading open={loadingChange} />
      <Header
        func={() => {
          dispatch({
            type: SidebarTypes.Open,
          });
        }}
        title="Detalles"
        previousRoute={route!.params.previousRoute}
      />
      <ScrollView
        style={{
          width: "100%",
        }}
      >
        <View style={styles.body}>
          <Image
            source={{ uri: `${imagesPath}${image_path}` }}
            style={{ ...styles.image, ...size, marginTop: 10 }}
          />
          <View
            style={{
              padding: 5,
            }}
          >
            <Text style={styles.title}>{toTitle(title)}</Text>
            <EventDetails
              end_date={end_date}
              end_time={end_time}
              event_type={event_type}
              init_date={init_date}
              init_time={init_time}
              place={place}
            />
            <Text
              style={{
                color: Colors.Dark,
                marginTop: 20,
                paddingBottom: 20,
              }}
            >
              {description}
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent:
              event_type === "event" ? "space-between" : "flex-end",
            marginTop: 10,
            paddingBottom: 30,
          }}
        >
          {auth.logged && event_type === "event" && (
            <>
              {!isSchedule ? (
                <TouchableOpacity
                  onPress={() => {
                    addScheduleEvent(_id);
                  }}
                  style={{
                    ...loginStyles.button,
                    backgroundColor:
                      auth.user?.user_type === "director de programa" ||
                      auth.user?.user_type === "docente"
                        ? Colors.Orange
                        : Colors.Blue,
                  }}
                >
                  <Text style={loginStyles.buttonText}>Agendar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    deleteScheduleEvent(_id);
                  }}
                  style={{
                    ...loginStyles.button,
                    backgroundColor:
                      auth.user?.user_type === "director de programa" ||
                      auth.user?.user_type === "docente"
                        ? Colors.Orange
                        : Colors.Blue,
                  }}
                >
                  <Text style={loginStyles.buttonText}>Remover</Text>
                </TouchableOpacity>
              )}
            </>
          )}
          {auth.logged && (
            <>
              {!event?.isFav ? (
                <TouchableOpacity
                  onPress={() => {
                    addFavoriteEvent(_id);
                  }}
                  style={{
                    ...loginStyles.button,
                    backgroundColor:
                      auth.user?.user_type === "director de programa" ||
                      auth.user?.user_type === "docente"
                        ? Colors.Orange
                        : Colors.Blue,
                  }}
                >
                  <Text style={loginStyles.buttonText}>Favorito</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    deleteFavoriteEvent(_id);
                  }}
                  style={{
                    ...loginStyles.button,
                    backgroundColor:
                      auth.user?.user_type === "director de programa" ||
                      auth.user?.user_type === "docente"
                        ? Colors.Orange
                        : Colors.Blue,
                  }}
                >
                  <Text style={loginStyles.buttonText}>Remover</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
