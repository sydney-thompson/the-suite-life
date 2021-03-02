import React from "react";
import { Alert } from "react-native";

import * as Facebook from "expo-facebook";
import * as firebase from "firebase";

import { auth } from "../firebase/firebase";

export default async function facebookLogin() {
  await Facebook.initializeAsync({ appId: "1097367824036534" });

  const data = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile"],
  });
  const { type, token } = data;

  if (type === "success") {
    // Build Firebase credential with the Facebook access token.
    // const provider = new firebase.auth.FacebookAuthProvider();
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    console.log("credential:", credential);

    // Sign in with credential from the Facebook user.
    auth.signInWithCredential(credential).catch((error) => {
      // Handle Errors here.
      console.log("Sign-in error:", error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      if (errorCode === "auth/account-exists-with-different-credential") {
        Alert.alert("Email already associated with another account.");
        // Handle account linking here, if using.
      } else {
        console.error(error);
      }
    });

    // NOTE: Can retrieve ID with (await response.json()).id or variations like const { id, name } = await response.json();
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
  } else {
    Alert.alert(
      "To login with Facebook, you must approve sign-in access for The Suite Life."
    );
  }
}
