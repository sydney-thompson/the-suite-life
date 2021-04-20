import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppText from "../components/AppText";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

const BalanceDisplay = ({ name, value }) => {
  // BalanceDisplay: component displaying balances on main Payment screen
  if (parseFloat(value) < 0) {color="danger"}
  else if (parseFloat(value) == 0) {color="tertiary"}
  else {color="primary"}

  return (
    <View style={styles.container}>
      <View style={styles.text2}>
      <AppText style={[{color: defaultStyles.colors.black}]}>{name}</AppText>
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: defaultStyles.colors[color] }]}>
        <Text style={styles.text}>{value} $</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.tertiary,
    borderRadius: 15,
    flexDirection: "row",
    width: "100%",
    padding: 5,
    marginVertical: 5,
    alignItems: "center",
    height: 75,
  },
  button: {
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "40%",
    height: 60,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  text2: {
    width: "50%",
    marginHorizontal: 15
  }
});

export default BalanceDisplay;
