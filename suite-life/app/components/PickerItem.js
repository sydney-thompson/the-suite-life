import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import colors from "../config/colors";

import AppText from "./text/AppText";

export default function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{item.label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 5,
    color: colors.black,
  },
});
