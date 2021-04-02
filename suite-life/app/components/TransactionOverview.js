import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

export default function TransactionOverview({
  amount,
  name,
  style = null,
  textStyle = null,
}) {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.title} numberOfLines={1}>
        {name}
      </AppText>
      <View style={styles.icon}>
        <AppText style={[styles.text, styles.money]}>
          {amount}
        </AppText>
      </View>
      <AppText style={styles.text}>{`details`}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10,
    width: 140,
  },
  icon: {
    margin: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  money: {
    color: colors.secondary,
    fontWeight: "300",
    fontSize: 35,
  },
  iconText: {
    color: colors.white,
    fontWeight: "500",
  },
  title: {
    alignSelf: "center",
    color: colors.black,
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    color: colors.black,
    fontSize: 20,
  },
});
