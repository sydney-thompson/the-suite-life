import React from "react";
import { StyleSheet, Text, Platform } from "react-native";

import defaultStyles from "../config/styles";

export default function AppText({ children, style, ...otherProps }) {
  return (
    <Text
      adjustsFontSizeToFit
      style={[defaultStyles.text, style]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}
