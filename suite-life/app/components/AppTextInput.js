import React from "react";
import { StyleSheet, Text, TextInput, View, Platform } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

const AppTextInput = ({ width = "100%", ...otherProps }) => {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, { color: defaultStyles.colors.black }]}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.truewhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: defaultStyles.colors.light,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
