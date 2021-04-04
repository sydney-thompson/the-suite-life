import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import Chore from "../components/Chore";
import colors from "../config/colors";
import { getUserData } from "../components/firebase/users";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import VerticalSpaceSeparator from "../components/VerticalSpaceSeparator";
import {
  disconnectFromChores,
  getUserChores,
} from "../components/firebase/suites";
import { auth } from "firebase";

export default function ApartmentScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [chores, setChores] = useState([]);

  useEffect(() => {
    getUserData().then((val) => {
      console.log("val:", val);
      setUser(val);
    });
  }, [auth]);

  useEffect(() => {
    if (user) {
      console.log("found user");
      getUserChores(setChores, user.suiteID, user.uid);
    } else {
      console.log("no user");
      setChores([]);
    }

    return () => {
      disconnectFromChores();
    };
  }, [user, setChores]);

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
              <Chore
                assigneeName={item.assignee_name}
                frequency={item.frequency}
                name={item.name}
              />
            )}
            ItemSeparatorComponent={VerticalSpaceSeparator}
          />
        )}
      </View>
      <View style={styles.cardContainer}>
        <AppTitle style={styles.cardText}>{`Payments`}</AppTitle>
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
