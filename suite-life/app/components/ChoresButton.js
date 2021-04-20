import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

const ChoresButton = ({ title, frequency, assignees,details, rightText, textStyle, onPress, color = "primary" }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.white }]}
      onPress={onPress}
    >
      <Text style={[defaultStyles.text, styles.title, textStyle]}>{title}</Text>
      <Text style={[defaultStyles.text, styles.text, textStyle]}>{assignees}</Text>
      <Text style={[defaultStyles.text, styles.text, textStyle]}>{frequency}</Text>
      <Text style={[defaultStyles.text, styles.detailsText, textStyle]}>{details}</Text>
      <Text style={[defaultStyles.text, styles.rightText, textStyle]}>{rightText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  title: {
    color: colors.black,
    fontWeight: "500",
    fontSize: 30,
    marginBottom: -25,
  },
  text: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: -30,
  },
  detailsText: {
    color: colors.black,
    fontSize: 20,
    marginTop: 30,
    marginBottom: -30,
  },
  rightText: {
    marginTop: 50,
    color: colors.black,
    fontSize: 20,
    alignSelf: "flex-end",
  }
});

export default ChoresButton;
