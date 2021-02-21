import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";

import defaultStyles from "../../config/styles";

export default function PaymentSuitemateScreen() {
  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Suitemate Payments</AppText>
      <AppButton
        title="Payment 1"
        color="tertiary"
        onPress={() => console.log("Payment 1 Tapped")}
      ></AppButton>
      <AppButton
        title="Payment 2"
        color="tertiary"
        onPress={() => console.log("Payment 2 Tapped")}
      ></AppButton>
      <AppButton
        title="Payment 2"
        color="tertiary"
        onPress={() => console.log("Payment 3 Tapped")}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
