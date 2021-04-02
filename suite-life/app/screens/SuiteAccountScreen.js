import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import AppTitle from "../components/AppTitle";
import colors from "../config/colors";
import HorizontalSpaceSeparator from "../components/HorizontalSpaceSeparator";
import Screen from "../components/Screen";
import Suitemate from "../components/Suitemate";
import {
  disconnectFromSuitemates,
  getSuitemates,
} from "../components/firebase/suites";
import { getUserData } from "../components/firebase/users";
import { auth } from "firebase";

export default function AccountScreen() {
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);

  useEffect(() => {
    getUserData().then((val) => {
      console.log("val:", val);
      setUser(val);
      console.log("user:", user);
    });
  }, [auth]);

  useEffect(() => {
    console.log("\n\n\tSUITEMATES user:", user);
    if (user) {
      getSuitemates(setSuitemates, user.suiteID);
      console.log("suitemates:", suitemates);
    } else {
      setSuitemates([]);
    }

    return () => {
      disconnectFromSuitemates();
    };
  }, [user, setSuitemates]);

  return (
    <Screen style={styles.screen}>
      <View style={[styles.cardContainer, styles.headerContainer]}>
        {user ? (
          <AppTitle
            style={styles.headerText}
          >{`Suite ${user.suiteID}`}</AppTitle>
        ) : (
          <AppTitle style={styles.headerText}>{`Suite`}</AppTitle>
        )}
      </View>
      <View style={[styles.cardContainer, { flex: 1 }]}>
        <AppTitle style={styles.cardText}>{`Suitemates`}</AppTitle>
        <FlatList
          data={suitemates}
          keyExtractor={(suitemate) => suitemate.id.toString()}
          renderItem={({ item }) => (
            <Suitemate name={item.name} pronouns={item.pronouns} />
          )}
          ItemSeparatorComponent={HorizontalSpaceSeparator}
        />
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
  },
  cardText: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "600",
  },
  screen: {
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    flex: 0,
    height: "15%",
    justifyContent: "center",
  },
  headerText: {
    color: colors.white,
    fontWeight: "600",
  },
});
