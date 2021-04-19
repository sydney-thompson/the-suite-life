import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AppText from "./AppText";

export default function Dollar({ children, style }) {
  const format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  return <AppText style={style}>${format(children)}</AppText>;
}

const styles = StyleSheet.create({});
