import React, { useEffect } from "react";
import Routes from "./src/routes/Routes";
import { AuthProvider } from "./src/common/components/AuthProvider/AuthProvider";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SideBarMenu from "./src/common/components/SideBarMenu/SideBarMenu";
import { SidebarContext } from "./src/common/context/sidebar/SidebarContext";

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        JSON.stringify(remoteMessage.notification?.title),
        JSON.stringify(remoteMessage.notification?.body)
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
