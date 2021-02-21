import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Header() {
  return <SafeAreaView style={styles.screen}></SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.primary,
    height: 100,
  },
});
