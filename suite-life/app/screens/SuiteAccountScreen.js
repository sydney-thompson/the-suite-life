import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppTitle from "../components/AppTitle";
import colors from "../config/colors";
import HorizontalSpaceSeparator from "../components/HorizontalSpaceSeparator";
import navigation from "../navigation/RulesNavigator";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Suitemate from "../components/Suitemate";
import {
  disconnectFromSuitemates,
  getSuitemates,
} from "../components/firebase/suites";
import { getUserData } from "../components/firebase/users";
import { auth } from "firebase";

import { getRules, updateRules } from "../components/firebase/suites";

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, [auth]);

  useEffect(() => {
    if (user) {
      getSuitemates(setSuitemates, user.suiteID);
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
      <View style={styles.buttonContainer}>
        <AppButton
          title="View Rules"
          color="primary"
          onPress={() => {
            getRules().then((res) => {
              navigation.navigate(routes.RULES, {rules: res});
            });
          }}
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
    paddingTop: 25,
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
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: "95%",
  },
});
