import React, {useEffect} from "react";
import Routes from "./src/routes/Routes";
import { AuthProvider } from "./src/common/components/AuthProvider/AuthProvider";
import messaging from '@react-native-firebase/messaging';

const App = () => {

  
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(new Date().toLocaleString());
    });

    return () => {unsubscribe()};
  }, []);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
