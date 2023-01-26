import React, { useContext, useReducer } from "react";
import Home from "../views/HomeScreen/Home";
import { FavoriteScreen } from "../views/FavoriteScreen/FavoriteScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { UserScreen } from "../views/UserScreen/UserScreen";
import { LoginContext } from "../common/context/login/LoginContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../views/LoginScreen/LoginScreen";
import { HomeInviteScreen } from "../views/HomeInviteScreen/HomeInviteScreen";
import { DetailsScreen } from "../views/DetailsScreen/DetailsScreen";
import { CreateEventScreen } from "../views/CreateEventScreen/CreateEventScreen";
import RegisterScreen from "../views/RegisterScreen/RegisterScreen";
import BackButton from "../common/components/BackButton/BackButton";
import Icon from "react-native-vector-icons/Entypo";
import { View } from "react-native";
import { SidebarContext } from "../common/context/sidebar/SidebarContext";
import { SidebarReducer } from "../common/context/sidebar/SidebarReducer";
import SideBarMenu from "../common/components/SideBarMenu/SideBarMenu";
import OpenMenuButton from "../common/components/OpenMenuButton/OpenMenuButton";
import { SidebarTypes } from "../common/context/sidebar/SideBarTypes";
import { ScheduleScreen } from "../views/ScheduleScreen/ScheduleScreen";
import MyEvents from "../views/MyEventsScreen/MyEventsScreen";

const tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Routes() {
  const { auth } = useContext(LoginContext);
  /* @ts-ignore */
  const [sidebar, setSidebar] = useReducer(
    SidebarReducer,
    /* @ts-ignore */
    {
      open: false,
      sidebarItems: [],
    },
    () => ({
      open: false,
      sidebarItems: [],
    })
  );

  return (
    <>
      {!auth.logged ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeInviteScreen}
            options={{
              headerTitle: "EventUM",
              headerLeft: () => BackButton({ previousRoute: "Login" }),
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerTitle: "Formulario de registro",
              headerLeft: () => BackButton({ previousRoute: "Login" }),
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              headerTitle: "Detalles",
              headerLeft: () => BackButton({ previousRoute: "Home" }),
            }}
          />
        </Stack.Navigator>
      ) : (
        <SidebarContext.Provider
          value={{
            sidebar,
            dispatch: setSidebar,
          }}
        >
          <SideBarMenu />
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Favoritos"
              component={FavoriteScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Agendado"
              component={ScheduleScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={UserScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreateEvent"
              component={CreateEventScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MyEvents"
              component={MyEvents}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SidebarContext.Provider>
      )}
    </>
  );
}

export default Routes;
