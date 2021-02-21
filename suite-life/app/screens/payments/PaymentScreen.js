import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";

import defaultStyles from "../../config/styles";

export default function PaymentScreen() {
  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Payments</AppText>
      <AppButton
        title="Suitemate 1"
        color="primary"
        onPress={() => console.log("Suitemate 1 Tapped")}
      ></AppButton>
      <AppButton
        title="Suitemate 2"
        color="primary"
        onPress={() => console.log("Suitemate 2 Tapped")}
      ></AppButton>
      <AppButton
        title="Suitemate 2"
        color="primary"
        onPress={() => console.log("Suitemate 3 Tapped")}
      ></AppButton>
      <AppButton
        title="Add Payment"
        color="secondary"
        onPress={() => console.log("Add Payment Tapped")}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
