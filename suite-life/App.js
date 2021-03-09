import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { auth, db } from "./app/components/firebase/firebase";
import navigationTheme from "./app/navigation/navigationTheme";

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitalizing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitalizing(false);
  }

  useEffect(() => {
    console.log("AUTH STATE CHANGED");
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  let Navigator = <AppNavigator />;
  if (!user) {
    Navigator = <AuthNavigator />;
  }
  // } else {
  //   console.log("user:", user);
  // }

  return (
    <NavigationContainer theme={navigationTheme}>
      {Navigator}
    </NavigationContainer>
  );
}
