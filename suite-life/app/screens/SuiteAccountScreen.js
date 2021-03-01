import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppText from "../components/AppText";

import Screen from "../components/Screen";
import defaultStyles from "../config/styles";

export default function AccountScreen() {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <AppText style={defaultStyles.title}>Suitemates</AppText>
        <View style={styles.suitematesContainer}>
          <AppText>Suitemate 1</AppText>
          <AppText>Suitemate 2</AppText>
          <AppText>Suitemate 3</AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },

  container: {
    paddingTop: 25,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "cover",
  },
  suitematesContainer: {},
});
