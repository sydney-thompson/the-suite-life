import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { googleLogout } from "../components/auth/googleAuth";

import Screen from "../components/Screen";
import defaultStyles from "../config/styles";

export default function AccountScreen() {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/icon.png")} />
        <AppText style={defaultStyles.title}>Name</AppText>
        <AppButton title="Log Out" onPress={googleLogout} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },

  container: {
    paddingTop: 25,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "cover",
  },
});
