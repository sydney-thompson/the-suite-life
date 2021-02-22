import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";

import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

export default function PaymentScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Payments</AppText>
      <AppButton
        title="Suitemate 1"
        color="primary"
        onPress={() => navigation.navigate(routes.PAYMENT_HISTORY)}
      ></AppButton>
      <AppButton
        title="Suitemate 2"
        color="primary"
        onPress={() => navigation.navigate(routes.PAYMENT_HISTORY)}
      ></AppButton>
      <AppButton
        title="Suitemate 2"
        color="primary"
        onPress={() => navigation.navigate(routes.PAYMENT_HISTORY)}
      ></AppButton>
      <AppButton
        title="Add Payment"
        color="secondary"
        onPress={() => navigation.navigate(routes.PAYMENT_ADD)}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
