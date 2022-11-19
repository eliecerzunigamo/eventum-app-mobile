import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../views/HomeScreen/Home";
import { FavoriteScreen } from "../views/FavoriteScreen/FavoriteScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Entypo";
import { UserScreen } from "../views/UserScreen/UserScreen";
import { LoginContext } from "../common/context/login/LoginContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../views/LoginScreen/LoginScreen";
import { HomeInviteScreen } from "../views/HomeInviteScreen/HomeInviteScreen";
import { DetailsScreen } from "../views/DetailsScreen/DetailsScreen";
import { Events } from "../views/HomeInviteScreen/hooks/useHomeInviteScreen";

const tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTabs = () => {
  return (
    <tab.Navigator shifting={true}>
      <tab.Screen
        name="Eventos"
        component={Home}
        options={{
          tabBarColor: "#555555",
          tabBarIcon: ({ color }) => (
            <Icon name="calendar" size={20} color={color} />
          ),
        }}
      />
      <tab.Screen
        name="Favoritos"
        component={FavoriteScreen}
        options={{
          tabBarColor: "#c0b01c",
          tabBarIcon: ({ color }) => (
            <Icon name="star" size={20} color={color} />
          ),
        }}
      />
      <tab.Screen
        name="Perfil"
        component={UserScreen}
        options={{
          tabBarColor: "#1cc0c0",
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={20} color={color} />
          ),
        }}
      />
    </tab.Navigator>
  );
};

function Routes() {
  const { auth } = useContext(LoginContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!auth.logged ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeInviteScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={MyTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
