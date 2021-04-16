import React from "react";
import { Alert } from "react-native";

import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";

import { auth } from "../firebase/firebase";
import firebaseConfig from "../firebase/firebaseConfig";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function googleLogin() {
  const { type, accessToken, user } = await Google.logInAsync({
    iosClientId: `907884719847-8do0qdtlq6a94oq2q7lijna1cnpkbmqn.apps.googleusercontent.com`,
    androidClientId: `907884719847-0c094rtuqvn89kdnugkcoja4a0qqu839.apps.googleusercontent.com`,
  });

  return new Promise((resolve, reject) => {
    if (type === "success") {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        null,
        accessToken
      );

      auth
        .signInWithCredential(credential)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
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
          resolve();
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
  });
}

export async function googleLogout(setRegistered) {
  // auth.signOut();

  // Sign out from firebase.
  // auth
  //   .signOut()
  //   .then(() => {
  //     console.log("logout auth.currentUser:", !(auth.currentUser === null));
  //     // Redirect to google sign out.
  //     console.log("LOGGING OUT OF GOOGLE");
  //     window.location.assign("https://accounts.google.com/logout");
  //     console.log("setting registered");
  //     setRegistered(false);
  //   })
  //   .catch(function (error) {
  //     // Error occurred.
  //   });
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
      setRegistered(false);
    })
    .catch((error) => {
      // An error happened.
    });
}
