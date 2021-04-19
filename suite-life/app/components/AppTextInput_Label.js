import React from "react";
import { StyleSheet, Text, TextInput, View, Platform } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import { colors } from "react-native-elements";
import AppText from "./AppText";
import AppTextInput from "./AppTextInput";

const AppTextInputLabel = ({ label, width = "100%", ...otherProps }) => {
  return (
    <View style={[styles.container, { width }]}>
      <AppText
        style={[defaultStyles.text, { color: defaultStyles.colors.black }]}
      >
        {label}
      </AppText>
      <TextInput
        placeholderTextColor={defaultStyles.colors.secondary}
        style={styles.inputbox}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  inputbox: {
    backgroundColor: defaultStyles.colors.truewhite,
    color: defaultStyles.colors.red,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    flex: 1,
    padding: 10,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: defaultStyles.colors.medium,
    borderRadius: 10,
  },
});

export default AppTextInputLabel;
