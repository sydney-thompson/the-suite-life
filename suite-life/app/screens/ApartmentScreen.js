import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import { getUserData } from "../components/firebase/users";
import Screen from "../components/Screen";
import colors from "../config/colors";

import defaultStyles from "../config/styles";
import routes from "../navigation/routes";

export default function ApartmentScreen({ navigation }) {
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  });

  return (
    <Screen style={styles.screen}>
      <View
        style={styles.welcomeContainer}
        color="primary"
        onPress={() => navigation.navigate(routes.SUITE)}
      >
        <AppTitle style={styles.welcomeText}>{`Welcome Back,`}</AppTitle>
        <AppTitle style={styles.welcomeText}>{`${user.name}`}</AppTitle>
      </View>
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
  welcomeContainer: {
    backgroundColor: colors.secondary,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    borderRadius: 10,
  },
  welcomeText: {
    color: colors.white,
    // fontSize: 20,
    fontWeight: "600",
  },
});
