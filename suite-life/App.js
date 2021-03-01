import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { auth, db } from "./app/components/firebase/firebase";
import navigationTheme from "./app/navigation/navigationTheme";

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);

  // listen for authentication state to change
  auth.onAuthStateChanged((user) => {
    if (user != null) {
      console.log("We are authenticated now!");
    }
  });

  async function loginWithFacebook() {
    await Facebook.initializeAsync("1097367824036534");

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });

    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
      const credential = auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      auth.signInWithCredential(credential).catch((error) => {
        console.log("Sign-in error");
        // Handle Errors here.
      });

      // NOTE: Can retrieve ID with (await response.json()).id or variations like const { id, name } = await response.json();
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    }
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
