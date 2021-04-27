import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AppText from "./AppText";

export default function Dollar({ children, style }) {
  const format = (amount) => {
    return Math.abs(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  let amount = parseFloat(children);

  return amount < 0 ? (
    <AppText style={style}>-${format(amount)}</AppText>
  ) : (
    <AppText style={style}>${format(amount)}</AppText>
  );
}

const styles = StyleSheet.create({});
