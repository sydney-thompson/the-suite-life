import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import { googleLogin, googleLogout } from "../../components/auth/googleAuth";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";

export default function WelcomeScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.titleContainer}>
        <AppTitle style={styles.title}>the suite life</AppTitle>
        <AppText style={styles.tagline}>make living with others easy</AppText>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="let's do this"
          textStyle={styles.buttonText}
          color="white"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    width: "100%",
  },
  buttonText: {
    color: colors.black,
  },
  createAccount: {
    color: colors.black,
    fontSize: 20,
  },
  titleContainer: {
    alignItems: "flex-start",
    position: "absolute",
    top: 120,
  },
  tagline: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 20,
    paddingLeft: 40,
  },
  title: {
    color: colors.black,
    fontSize: 150,
    flexWrap: "wrap",
    lineHeight: 135,
    paddingTop: 30,
    paddingLeft: 40,
  },
});
