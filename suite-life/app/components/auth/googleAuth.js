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

  if (type === "success") {

    const credential = firebase.auth.GoogleAuthProvider.credential(
      null,
      accessToken
    );

    auth.signInWithCredential(credential).catch((error) => {
      // Handle Errors here.
      console.log("Sign-in error:", error);
      // Handle Errors here.
      const errorCode = error.code;
      
      //const errorMessage = error.message;
      // The email of the user's account used.
      //const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      if (errorCode === "auth/account-exists-with-different-credential") {
        Alert.alert("Email already associated with another account.");
        // Handle account linking here, if using.
        reject("error");
      } else {
        console.error(error);
        reject("error");
      }
      resolve("success");
    });
  } else if (type === "cancel") {
    Alert.alert(
      "To login with Google, you must approve sign-in access for The Suite Life."
    );
    reject(type);
  } else {
    console.log("Type:", type);
    reject("type");
  }
}

export async function googleLogout() {
  auth.signOut();
}