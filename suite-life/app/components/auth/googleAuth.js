import React from "react";
import { Alert } from "react-native";

import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";

import { auth } from "../firebase/firebase";
import firebaseConfig from "../firebase/firebaseConfig";

export async function googleLogin() {
  const { type, accessToken, user } = await Google.logInAsync({
    iosClientId: `907884719847-8do0qdtlq6a94oq2q7lijna1cnpkbmqn.apps.googleusercontent.com`,
    androidClientId: `907884719847-0c094rtuqvn89kdnugkcoja4a0qqu839.apps.googleusercontent.com`,
  });
  console.log("type:", type);
  console.log("accessToken:", accessToken);
  console.log("user:", user);

  if (type === "success") {
    // Build Firebase credential with the Facebook access token.
    // const provider = new firebase.auth.FacebookAuthProvider();
    const credential = firebase.auth.GoogleAuthProvider.credential(
      null,
      accessToken
    );
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
    console.log("signed in?");

    // NOTE: Can retrieve ID with (await response.json()).id or variations like const { id, name } = await response.json();
    // const response = await fetch(
    //   `https://graph.facebook.com/me?access_token=${accessToken}`
    // );
    // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);

    // // Then you can use the Google REST API
    // let userInfoResponse = await fetch(
    //   "https://www.googleapis.com/userinfo/v2/me",
    //   {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   }
    // );
  } else if (type === "cancel") {
    Alert.alert(
      "To login with Google, you must approve sign-in access for The Suite Life."
    );
  } else {
    console.log("Type:", type);
  }
}

export async function googleLogout() {
  auth.signOut();
}
