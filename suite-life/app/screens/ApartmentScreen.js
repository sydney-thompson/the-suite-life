import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

import defaultStyles from "../config/styles";
import routes from "../navigation/routes";

export default function ApartmentScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Apartment Name</AppText>
      <AppButton
        title="Suite"
        color="primary"
        onPress={() => navigation.navigate(routes.SUITE)}
      ></AppButton>
      <AppButton
        title="Chores"
        color="primary"
        onPress={() => navigation.navigate(routes.CHORE_NAV)}
      ></AppButton>
      <AppButton
        title="Payments"
        color="primary"
        onPress={() => navigation.navigate(routes.PAYMENT_NAV)}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
