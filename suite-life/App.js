import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { auth } from "./app/components/firebase/firebase";
import navigationTheme from "./app/navigation/navigationTheme";
import RegistrationContext from "./app/components/auth/RegistrationContext";
import { checkUserExists } from "./app/components/firebase/users";
import { googleLogout } from "./app/components/auth/googleAuth";
import { Alert } from "react-native";

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitalizing] = useState(true);
  const [user, setUser] = useState();
  const [registered, setRegistered] = useState(!!user);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitalizing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [user]);

  if (initializing) return null;

  let Navigator = <AuthNavigator />;
  if (registered) {
    Navigator = <AppNavigator />;
  }

  return (
    <RegistrationContext.Provider value={{ setRegistered }}>
      <NavigationContainer theme={navigationTheme}>
        {Navigator}
      </NavigationContainer>
    </RegistrationContext.Provider>
  );
}
