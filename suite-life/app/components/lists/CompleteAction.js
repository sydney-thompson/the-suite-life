import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

const CompleteAction = ({
  color = "secondary",
  iconName = "check",
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, { backgroundColor: colors[color] }]}>
        <MaterialCommunityIcons
          name={iconName}
          size={35}
          color={colors.white}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});

export default CompleteAction;
