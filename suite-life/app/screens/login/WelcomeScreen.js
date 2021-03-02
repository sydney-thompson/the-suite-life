import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import loginWithFacebook from "../../components/auth/loginWithFacebook";
import loginWithGoogle from "../../components/auth/loginWithGoogle";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";

export default function WelcomeScreen({ navigation }) {
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
          onPress={loginWithGoogle}
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
