import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../AppButton";
import AppText from "../text/AppText";
import Dollar from "../text/Dollar";
import colors from "../../config/colors";

export default function Payment({
  title,
  details,
  net_amount,
  color,
  completed,
}) {
  const backgroundColor = completed ? colors.medium : colors.tertiary;
  color = completed ? "dark" : color;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.text}>{details}</AppText>
      </View>
      <Dollar style={[styles.amount, { color: colors[color] }]}>
        {net_amount}
      </Dollar>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontSize: 24,
  },
  container: {
    flexDirection: "row",
    borderRadius: 15,
    alignItems: "center",
    padding: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: colors.black,
  },
  text: {
    color: colors.dark,
  },
});
