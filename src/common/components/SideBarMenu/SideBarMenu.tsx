import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SidebarContext } from "../../context/sidebar/SidebarContext";
import { SidebarTypes } from "../../context/sidebar/SideBarTypes";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import IonICons from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../utils/Enums";
import { LoginContext } from "../../context/login/LoginContext";
import Header from "../Header/Header";
import Modal from "react-native-modal";

export default function SideBarMenu() {
  const { sidebar, dispatch } = useContext(SidebarContext);
  const { auth } = useContext(LoginContext);

  return (
    <>
      {sidebar.sideBarItems && (
        <Modal
          isVisible={sidebar.open}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          style={{
            backgroundColor: "white",
            margin: 0,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <Header
              func={() => {
                dispatch({
                  type: SidebarTypes.Close,
                });
              }}
              title={"Menu"}
            />
            <View>
              {sidebar.sideBarItems.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          item.function();
                          dispatch({
                            type: SidebarTypes.Close,
                          });
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "white",
                          height: 50,
                          width: "100%",
                          marginBottom: 5,
                          padding: 10,
                        }}
                      >
                        {item.iconType === "Entypo" ? (
                          <EntypoIcon
                            size={25}
                            name={item.icon}
                            color={
                              auth.user?.user_type === "director de programa" ||
                              auth.user?.user_type === "docente"
                                ? Colors.LightOrange
                                : Colors.Blue
                            }
                          />
                        ) : item.iconType === "FontAwesome5" ? (
                          <FontAwesome5Icon
                            size={25}
                            name={item.icon}
                            color={
                              auth.user?.user_type === "director de programa" ||
                              auth.user?.user_type === "docente"
                                ? Colors.LightOrange
                                : Colors.Blue
                            }
                          />
                        ) : item.iconType === "Ionicons" ? (
                          <IonICons
                            size={25}
                            name={item.icon}
                            color={
                              auth.user?.user_type === "director de programa" ||
                              auth.user?.user_type === "docente"
                                ? Colors.LightOrange
                                : Colors.Blue
                            }
                          />
                        ) : item.iconType === "MaterialCommunityIcons" ? (
                          <MaterialCommunityIcons
                            size={25}
                            name={item.icon}
                            color={
                              auth.user?.user_type === "director de programa" ||
                              auth.user?.user_type === "docente"
                                ? Colors.LightOrange
                                : Colors.Blue
                            }
                          />
                        ) : (
                          <Icon
                            size={25}
                            name={item.icon}
                            color={
                              auth.user?.user_type === "director de programa" ||
                              auth.user?.user_type === "docente"
                                ? Colors.LightOrange
                                : Colors.Blue
                            }
                          />
                        )}
                        <Text
                          style={{
                            fontSize: 18,
                            marginLeft: 10,
                            color: Colors.Dark,
                          }}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        height: 2,
                        width: "95%",
                        backgroundColor: Colors.OrangeGray,
                      }}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
