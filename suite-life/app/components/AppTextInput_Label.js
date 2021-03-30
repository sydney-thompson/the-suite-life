import React from "react";
import { StyleSheet, Text, TextInput, View, Platform } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

const AppTextInputLabel = ({ label, width = "100%", ...otherProps }) => {
  return (
    <View style={[styles.container, { width }]}>
      <Text style={[defaultStyles.text, {color: defaultStyles.colors.black}]}>{label}</Text>
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
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 5,
    alignItems: "center",
  },
  inputbox: {
    color: defaultStyles.colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    width: "75%",
    padding: 10,
    marginLeft: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: defaultStyles.colors.secondary,
    borderRadius: 10
  }
});

export default AppTextInputLabel;
