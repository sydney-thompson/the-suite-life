import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppButton from "../components/AppButton";

export default function ColorTestScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Title Text</Text>
        <Text style={styles.subTitleText}>Subtitle Text</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Button" />
      </View>
      <View style={styles.paletteContainer}>
        <View style={styles.black} />
        <View style={styles.primary} />
        <View style={styles.secondary} />
        <View style={styles.tertiary} />
        <View style={styles.white} />
        {colors.quaternary && <View style={styles.quaternary} />}
        {colors.quinary && <View style={styles.quinary} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.black,
  },
  screen: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  textContainer: {
    padding: 20,
    flex: 5,
    alignItems: "center",
  },
  titleText: {
    color: colors.black,
    fontSize: 50,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Times New Roman",
    fontWeight: "bold",
  },
  subTitleText: {
    color: colors.secondary,
    fontSize: 24,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  paletteContainer: {
    flexDirection: "row",
  },
  black: {
    backgroundColor: colors.black,
    height: 300,
    flex: 1,
  },
  white: {
    backgroundColor: colors.white,
    height: 300,
    flex: 1,
  },
  primary: {
    backgroundColor: colors.primary,
    height: 300,
    flex: 1,
  },
  secondary: {
    backgroundColor: colors.secondary,
    height: 300,
    flex: 1,
  },
  tertiary: {
    backgroundColor: colors.tertiary,
    height: 300,
    flex: 1,
  },
  quaternary: {
    backgroundColor: colors.quaternary,
    height: 300,
    flex: 1,
  },
  quinary: {
    backgroundColor: colors.quinary,
    height: 300,
    flex: 1,
  },
});
