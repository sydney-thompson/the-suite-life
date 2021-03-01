import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";

import AppButton from "../../components/AppButton";
import { auth } from "../../components/firebase/firebase";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";

export default function WelcomeScreen({ navigation }) {
  async function loginWithFacebook() {
    // const appId = "1097367824036534";
    // const appName = "the-suite-life";
    await Facebook.initializeAsync();

    console.log("trying login");
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });

    console.log("trying to get credentials");
    console.log("type:", type);
    console.log("token:", token);
    if (type === "success") {
      console.log("SUCCESS!");
      // Build Firebase credential with the Facebook access token.
      const credential = auth.FacebookAuthProvider.credential(token);
      console.log("credeintial:", credential);
      // Sign in with credential from the Facebook user.
      auth.signInWithCredential(credential).catch((error) => {
        // Handle Errors here.
        console.log("error:", error);
      });
    }
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/favicon.png")}
        />
        <Text style={styles.tagline}>The Suite Life</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login"
          color="primary"
          onPress={loginWithFacebook}
          // onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <TouchableOpacity onPress={() => navigation.navigate(routes.REGISTER)}>
          <AppText style={styles.createAccount}>Create Account</AppText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  createAccount: {
    color: colors.black,
    fontSize: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    color: colors.black,
    fontSize: 40,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Times New Roman",
    fontWeight: "bold",
    paddingVertical: 20,
  },
});
