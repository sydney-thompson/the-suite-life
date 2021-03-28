import React from "react";
import { StyleSheet, Text, Platform } from "react-native";

import defaultStyles from "../config/styles";

export default function AppTitle({ children, style, ...otherProps }) {
  return (
    <Text
      adjustsFontSizeToFit
      style={[defaultStyles.title, style]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}
