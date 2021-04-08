import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

export default function Suitemate({
  name,
  pronouns,
  style = null,
  textStyle = null,
}) {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.title} numberOfLines={1}>
        {name}
      </AppText>
      <AppText style={styles.text} numberOfLines={1}>
        {pronouns}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-evenly",
    padding: 15,
  },
  title: {
    color: colors.black,
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    color: colors.black,
    fontSize: 22,
  },
});
