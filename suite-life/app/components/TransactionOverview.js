import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import Dollar from "./Dollar";

export default function TransactionOverview({
  amount,
  details,
  title,
  style = null,
  textStyle = null,
}) {
  let color = "medium";
  if (parseFloat(amount) < 0) {
    color = "danger";
  } else if (parseFloat(amount) > 0) {
    color = "primary";
  }

  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.title} numberOfLines={1}>
        {title}
      </AppText>
      <View style={styles.icon}>
        <Dollar style={[styles.text, styles.money, { color: colors[color] }]}>
          {amount}
        </Dollar>
      </View>
      <AppText style={styles.detailsText} numberOfLines={2}>
        {details}
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
    padding: 5,
    width: 160,
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
    alignSelf: "flex-end",
  },
  detailsText: {
    color: colors.secondary,
    fontSize: 20,
    alignSelf: "flex-end",
  },
});
