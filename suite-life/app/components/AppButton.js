import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

const AppButton = ({ title, textStyle, onPress, color = "primary" }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={[defaultStyles.text, styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    // marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AppButton;
