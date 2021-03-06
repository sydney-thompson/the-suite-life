import React from "react";
import { StyleSheet, Text } from "react-native";

import colors from "../config/colors";

const BalanceDisplay = ({ name, value, color = "primary" }) => {
  // BalanceDisplay: placeholder for probably flexbox component displaying balances on main Transaction page
  return (
    <Text style={[styles.display, { backgroundColor: colors[color] }]}>
            {name}: {value}
    </Text>
  );
};

const styles = StyleSheet.create({
  display: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BalanceDisplay;
