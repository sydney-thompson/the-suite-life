import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "./AppButton";
import AppText from "./AppText";
import Dollar from "./Dollar";
import colors from "../config/colors";

export default function Payment({ title, details, net_amount, color }) {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <AppText style={styles.text}>{title}</AppText>
        <AppText style={styles.text}>{details}</AppText>
      </View>
      <Dollar style={[styles.text, { color: colors[color] }]}>
        {net_amount}
      </Dollar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    flexDirection: "row",
    borderRadius: 15,
    alignItems: "center",
    padding: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  text: {
    color: colors.black,
  },
});
