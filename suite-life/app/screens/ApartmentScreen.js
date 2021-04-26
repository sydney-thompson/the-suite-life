import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import AppText from "../components/text/AppText";
import AppTitle from "../components/text/AppTitle";
import ChoreOverview from "../components/lists/ChoreOverview";
import TransactionOverview from "../components/lists/TransactionOverview";
import colors from "../config/colors";
import { auth } from "firebase";
import { getUserData } from "../components/firebase/users";
import Screen from "../components/Screen";
import VerticalSpaceSeparator from "../components/lists/VerticalSpaceSeparator";
import {
  disconnectFromChores,
  getUserChores,
  disconnectFromTransactions,
  getUserTransactions,
} from "../components/firebase/suites";

export default function ApartmentScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [chores, setChores] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, [auth]);

  useEffect(() => {
    if (user) {
      getUserChores(setChores, user.suiteID, user.uid);
    } else {
      setChores([]);
    }

    return () => {
      disconnectFromChores();
    };
  }, [user, setChores]);

  useEffect(() => {
    if (user) {
      getUserTransactions(setTransactions, user.suiteID, user.uid);
    } else {
      setTransactions([]);
    }

    return () => {
      disconnectFromTransactions();
    };
  }, [user, setTransactions]);

  return (
    <Screen style={styles.screen}>
      <View style={[styles.cardContainer, styles.welcomeContainer]}>
        <AppTitle style={styles.welcomeText}>{`Welcome Back`}</AppTitle>
        {user && (
          <AppTitle style={styles.welcomeText}>{`${user.name}`}</AppTitle>
        )}
      </View>
      <View style={styles.cardContainer}>
        <AppTitle style={styles.cardText}>{`Chores`}</AppTitle>
        {chores.length === 0 ? (
          <View style={styles.clearedContainer}>
            <AppText style={styles.clearedText}>{"All cleared!"}</AppText>
            <AppText style={styles.clearedText}>{"Good job!"}</AppText>
          </View>
        ) : (
          <FlatList
            data={chores}
            horizontal={true}
            keyExtractor={(chore) => chore.id.toString()}
            renderItem={({ item }) => (
              <ChoreOverview
                day={item.day}
                details={item.details}
                frequency={item.frequency}
                name={item.name}
              />
            )}
            ItemSeparatorComponent={VerticalSpaceSeparator}
          />
        )}
      </View>

      <View style={styles.cardContainer}>
        <AppTitle style={styles.cardText}>{`Transactions`}</AppTitle>
        {transactions.length === 0 ? (
          <View style={styles.clearedContainer}>
            <AppText style={styles.clearedText}>
              {"No outstanding transactions"}
            </AppText>
          </View>
        ) : (
          <FlatList
            data={transactions}
            horizontal={true}
            keyExtractor={(transaction) => transaction.id}
            renderItem={({ item }) => (
              <TransactionOverview
                amount={item.net_amount}
                details={item.details}
                title={item.title}
                payer={item.payer}
                payee={item.payees}
                item={item}
              />
            )}
            ItemSeparatorComponent={VerticalSpaceSeparator}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 15,
    width: "95%",
    margin: "2%",
    height: "33%",
    flex: 1,
  },
  cardText: {
    marginBottom: 5,
    fontSize: 30,
    fontWeight: "600",
  },
  clearedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  clearedText: {
    color: colors.light,
    fontSize: 25,
    fontWeight: "600",
  },
  screen: {
    alignItems: "center",
  },
  welcomeContainer: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    height: "25%",
    justifyContent: "center",
    flex: 0,
  },
  welcomeText: {
    color: colors.white,
    fontWeight: "600",
  },
});
