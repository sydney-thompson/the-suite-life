import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import {
  auth,
  db,
  checksuite,
  checkSuiteExists,
  checkUserExists,
} from "./app/components/firebase/firebase";
import navigationTheme from "./app/navigation/navigationTheme";

var userhere = false;
var suitefound = false;

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitalizing] = useState(true);
  const [user, setUser] = useState();
  const [registered, setRegistered] = useState(false);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitalizing(false);
  }

  useEffect(() => {
    console.log("AUTH STATE CHANGED");
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [registered]);

  if (user) {
    checkUserExists(auth.currentUser.uid)
      .then((res) => {
        console.log("exists:", res);
        if (res) setRegistered(res);
      })
      .catch((res) => console.log("ERROR:", res));
  }

  if (initializing) return null;

  let Navigator = <AuthNavigator />;
  if (user) {
    Navigator = <AppNavigator />;
  } else {
    console.log("user:", user);
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {Navigator}
    </NavigationContainer>
  );
}
