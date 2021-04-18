import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import BalanceDisplay from "../../components/BalanceDisplay";
import Screen from "../../components/Screen";
import AppTitle from "../../components/AppTitle";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

export default function PaymentScreen({ navigation }) {
  // Balances placeholder: populate by retrieving suite members and balances;
  // color depending on sign of balance value
  const Balances = [
  {
    name: "Suitemate 1",
    id: 123,
    value: 15,
  },
  {
    name: "Suitemate 2",
    id: 456,
    value: -60,
  }
  ];
  return (
    <Screen style={styles.screen}>
      <View style={[styles.cardContainer, styles.headerContainer]}>
        <AppText style={styles.headerText}>Transactions</AppText>
      </View>

      <View style={[styles.cardContainer, { flex: 1 }]}>
        <AppTitle style={styles.cardText}>{`Balances`}</AppTitle>
        {Balances.map((balance) => {
          return (
          <BalanceDisplay name={balance.name} key={balance.id} value={balance.value} />
          );
        })}
      </View>

      <View style={styles.topButtonContainer}>
          <AppButton
            title="See history"
            color="secondary"
            onPress={() => navigation.navigate(routes.PAYMENT_HISTORY)}
          ></AppButton>
      </View>

      <View style={styles.buttonContainer}>
          <AppButton
            title="Add transaction +"
            color="secondary"
            onPress={() => navigation.navigate(routes.PAYMENT_ADD)}
          ></AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({

  screen: {
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 15,
    width: "95%",
    margin: "2%",
  },
  headerContainer: {
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: colors.secondary,
    flex: 0,
    height: "11%",
    justifyContent: "center",
  },
  cardText: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "600",
  },
  headerText: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 40,
  },

  topButtonContainer: {
    alignItems: "center",
    marginBottom: -5,
    width: "95%",
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: "95%",
  },
});
