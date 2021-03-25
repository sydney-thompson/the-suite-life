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
import ChoreListSeparater from "../components/ChoreListSeparater";

const initialChores = [
  { id: "chore1", assignee: "Sydney", frequency: "Weekly", name: "Laundry" },
  {
    id: "chore2",
    assignee: "Sydney",
    frequency: "Daily",
    name: "Vaccuuming ",
  },
  { id: "chore3", assignee: "Sydney", frequency: "Daily", name: "Dishes" },
  { id: "chore4", assignee: "Sydney", frequency: "Weekly", name: "Dusting" },
];

export default function ApartmentScreen({ navigation }) {
  const [user, setUser] = useState({ name: "" });
  const [chores, setChores] = useState(initialChores);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  });

  return (
    <Screen style={styles.screen}>
      <View style={[styles.cardContainer, styles.welcomeContainer]}>
        <AppTitle style={styles.welcomeText}>{`Welcome Back,`}</AppTitle>
        <AppTitle style={styles.welcomeText}>{`${user.name}`}</AppTitle>
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
            keyExtractor={(chore) => chore.id}
            renderItem={({ item }) => (
              <Chore
                assignee={item.assignee}
                frequency={item.frequency}
                name={item.name}
              />
            )}
            ItemSeparatorComponent={ChoreListSeparater}
            refreshing={refreshing}
            onRefresh={() => setChores(initialChores)}
          />
        )}
      </View>
      <AppButton
        title="Payments"
        color="primary"
        onPress={() => navigation.navigate(routes.PAYMENT_NAV)}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 15,
    width: "95%",
    margin: 10,
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
