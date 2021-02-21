import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";

import defaultStyles from "../../config/styles";

export default function PaymentAddScreen() {
  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Add Payment</AppText>
      <AppButton
        title="Add Payment"
        color="primary"
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
