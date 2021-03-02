import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import { googleLogin, googleLogout } from "../../components/auth/googleAuth";
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
        <Text style={styles.title}>The Suite Life</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login with Google"
          color="black"
          onPress={googleLogin}
          // onPress={() => navigation.navigate(routes.LOGIN)}
        />
        {/* <TouchableOpacity onPress={() => navigation.navigate(routes.REGISTER)}>
          <AppText style={styles.createAccount}>Create Account</AppText>
        </TouchableOpacity> */}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.secondary,
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
  title: {
    color: colors.white,
    fontSize: 50,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Times New Roman",
    fontWeight: "bold",
    paddingVertical: 20,
  },
});
