import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import ChoreOverview from "../components/ChoreOverview";
import TransactionOverview from "../components/TransactionOverview";
import colors from "../config/colors";
import { getUserData } from "../components/firebase/users";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import VerticalSpaceSeparator from "../components/VerticalSpaceSeparator";
import {
  disconnectFromChores,
  getUserChores,
  disconnectFromTransactions,
  getUserTransactions,
} from "../components/firebase/suites";
import { auth } from "firebase";
import { db } from "../components/firebase/firebase";

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
        {
          <FlatList
            data={transactions}
            horizontal={true}
            keyExtractor={(transaction) => transaction.id}
            renderItem={({ item }) => (
              <TransactionOverview
                amount={item.amount}
                color={item.color}
                details={item.details}
                title={item.title}
              />
            )}
            ItemSeparatorComponent={VerticalSpaceSeparator}
          />
        }
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
  },
  cardText: {
    marginBottom: 10,
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
  },
  welcomeText: {
    color: colors.white,
    fontWeight: "600",
  },
});
