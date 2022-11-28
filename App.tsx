import React, { useEffect } from "react";
import Routes from "./src/routes/Routes";
import { AuthProvider } from "./src/common/components/AuthProvider/AuthProvider";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        JSON.stringify(remoteMessage.notification?.title),
        JSON.stringify(remoteMessage.notification?.body)
      );
      console.log(new Date().toLocaleString());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
