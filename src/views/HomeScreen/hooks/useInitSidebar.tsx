import React, { useContext, useEffect, useMemo } from "react";
import { LoginContext } from "../../../common/context/login/LoginContext";
import {
  SidebarContext,
  SideBarItem,
} from "../../../common/context/sidebar/SidebarContext";
import { SidebarTypes } from "../../../common/context/sidebar/SideBarTypes";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginTypes } from "../../../common/context/login/LoginTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useInitSidebar = (
  openFilterFunc: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean
) => {
  const { dispatch } = useContext(SidebarContext);
  const { auth, dispatch: LoginDispatch } = useContext(LoginContext);
  const navigate = useNavigation<StackNavigationProp<any>>();

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userInfo");
    LoginDispatch({ type: LoginTypes.logout });
  };

  const loggedUserMenu: SideBarItem[] = useMemo(
    () => [
      {
        name: "Inicio",
        function: () => {
          navigate.navigate("Home");
        },
        icon: "circle-thin",
      },
      {
        name: "Perfil",
        function: () => {
          navigate.navigate("Profile");
        },
        icon: "user",
      },
      {
        name: "Filtros",
        function: () => {
          openFilterFunc(true);
        },
        icon: "switch",
        iconType: "Entypo",
      },
      {
        name: "Favoritos",
        function: () => {
          navigate.navigate("Favoritos");
        },
        icon: "star",
      },
      {
        name: "Agendados",
        function: () => {
          navigate.navigate("Agendado");
        },
        icon: "checkmark-circle-outline",
        iconType: "Ionicons",
      },
      {
        name: "Cerrar sesión",
        function: logout,
        icon: "sign-out",
      },
    ],
    []
  );

  const loggedAdminMenu: SideBarItem[] = useMemo(
    () => [
      {
        name: "Inicio",
        function: () => {
          navigate.navigate("Home");
        },
        icon: "circle-thin",
      },
      {
        name: "Perfil",
        function: () => {
          navigate.navigate("Profile");
        },
        icon: "user",
      },
      {
        name: "Filtros",
        function: () => {
          openFilterFunc(true);
        },
        icon: "switch",
        iconType: "Entypo",
      },
      {
        name: "Favoritos",
        function: () => {
          navigate.navigate("Favoritos");
        },
        icon: "star",
      },
      {
        name: "Agendados",
        function: () => {
          navigate.navigate("Agendado");
        },
        icon: "checkmark-circle-outline",
        iconType: "Ionicons",
      },
      {
        name: "Mis eventos",
        function: () => {
          navigate.navigate("MyEvents");
        },
        icon: "calendar-day",
        iconType: "FontAwesome5",
      },
      {
        name: "Crear evento",
        function: () => {
          navigate.navigate("CreateEvent");
        },
        icon: "plus",
      },
      {
        name: "Cerrar sesión",
        function: logout,
        icon: "sign-out",
      },
    ],
    []
  );

  useEffect(() => {
    if (isOpen)
      dispatch({
        type: SidebarTypes.SetUserMenu,
        sidebar: {
          open: true,
          sideBarItems:
            auth.user?.user_type === "director de programa" ||
            auth.user?.user_type === "docente"
              ? loggedAdminMenu
              : loggedUserMenu,
        },
      });
  }, [isOpen]);

  return {};
};
