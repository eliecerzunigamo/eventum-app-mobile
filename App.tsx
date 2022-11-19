import React from "react";
import Routes from "./src/routes/Routes";
import { AuthProvider } from "./src/common/components/AuthProvider/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
