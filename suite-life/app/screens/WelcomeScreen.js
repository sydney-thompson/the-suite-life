import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import colors from "../config/colors";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";

export default function WelcomeScreen() {
  return (
    <Screen style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/favicon.png")} />
        <Text style={styles.tagline}>The Suite Life</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login"
          color="primary"
          onPress={() => console.log("Login tapped")}
        ></AppButton>
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => console.log("Register tapped")}
        ></AppButton>
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
