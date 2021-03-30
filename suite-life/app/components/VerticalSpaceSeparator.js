import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function VerticalSpaceSeparator() {
  return <View style={styles.conatiner} />;
}

const styles = StyleSheet.create({
  conatiner: {
    width: 20,
  },
});
