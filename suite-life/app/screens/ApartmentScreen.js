import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

import defaultStyles from "../config/styles";

export default function ApartmentScreen() {
  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Apartment Name</AppText>
      <AppButton
        title="Chores"
        color="primary"
        onPress={() => console.log("Chores Tapped")}
      ></AppButton>
      <AppButton
        title="Payments"
        color="primary"
        onPress={() => console.log("Payments Tapped")}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
