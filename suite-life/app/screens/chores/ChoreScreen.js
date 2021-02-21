import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";

import defaultStyles from "../../config/styles";

export default function ChoreScreen() {
  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Add Chore</AppText>
      <AppButton
        title="Chore 1"
        color="tertiary"
        onPress={() => console.log("Chore 1 Tapped")}
      ></AppButton>
      <AppButton
        title="Chore 2"
        color="tertiary"
        onPress={() => console.log("Chore 2 Tapped")}
      ></AppButton>
      <AppButton
        title="Add Chore"
        color="primary"
        onPress={() => console.log("Add Chore Tapped")}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
