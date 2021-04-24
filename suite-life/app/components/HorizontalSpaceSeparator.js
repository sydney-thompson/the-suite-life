import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HorizontalSpaceSeparator() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    height: 12,
  },
});
