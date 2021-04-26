import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppText from "./text/AppText";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import Dollar from "./Dollar";

const BalanceDisplay = ({ name, value }) => {
  // BalanceDisplay: component displaying balances on main Payment screen
  let color = "medium";
  if (parseFloat(value) < 0) {
    color = "danger";
  } else if (parseFloat(value) > 0) {
    color = "primary";
  }

  return (
    <View style={styles.container}>
      <View style={styles.text2}>
        <AppText style={styles.name}>{name}</AppText>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: defaultStyles.colors[color] },
        ]}
      >
        <Dollar style={styles.balance}>{value}</Dollar>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.tertiary,
    borderRadius: 15,
    flexDirection: "row",
    width: "100%",
    padding: 5,
    alignItems: "center",
    height: 75,
  },
  button: {
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "40%",
    height: 60,
  },
  name: { color: defaultStyles.colors.black, fontWeight: "500", fontSize: 24 },
  balance: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "800",
  },
  text2: {
    width: "50%",
    marginHorizontal: 15,
  },
});

export default BalanceDisplay;
