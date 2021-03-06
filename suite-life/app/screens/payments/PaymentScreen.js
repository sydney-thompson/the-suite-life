import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import BalanceDisplay from "../../components/BalanceDisplay";
import Screen from "../../components/Screen";

import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

export default function PaymentScreen({ navigation }) {
  // Balances placeholder: populate by retrieving suite members and balances; 
  // color depending on sign of balance value
  const Balances = [
  {
    name: "Suitemate 1",
    value: 15,
    color: "primary"
  },
  {
    name: "Suitemate 2",
    value: -60,
    color: "tertiary"
  }
  ];
  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Transactions</AppText>
      {Balances.map((balance) => {
        return (
        <BalanceDisplay name={balance.name} value={balance.value} color={balance.color} />
        );
      })}
      <AppButton
        title="See history"
        color="secondary"
        onPress={() => navigation.navigate(routes.PAYMENT_HISTORY)}
      ></AppButton>
      <AppButton
        title="Add transaction +"
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
