import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

const HistoryItem = ({ title, payer, details, amount, involved, textStyle, onPress, color = "primary" }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={[defaultStyles.text, styles.amount]}>{amount}</Text>
      <Text style={[defaultStyles.text, styles.title, textStyle]}>{title}</Text>
      <Text style={[defaultStyles.text, styles.payer]}>{payer}</Text>
      <Text style={[defaultStyles.text, styles.involved]}>{involved}</Text>
      <Text style={[defaultStyles.text, styles.details]}>{details}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  amount: {
    color: colors.black,
    fontWeight: "500",
    fontSize: 35,
  },
  title: {
    color: colors.black,
    fontSize: 25,
    fontWeight: "500",
  },
  payer: {
    color: colors.secondary,
    fontSize: 20,
    marginBottom: -5,
  },
  involved: {
    color: colors.secondary,
    fontSize: 20,
  },
  details: {
    color: colors.black,
    fontSize: 20,
  },
});

export default HistoryItem;
