import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { useFormikContext } from "formik";

import defaultStyles from "../../config/styles";
import colors from "../../config/colors";
import AppText from "../text/AppText";

export default function AppFormRadioButton({ name, label, ...otherProps }) {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>
      <Switch
        trackColor={{ false: colors.dark, true: colors.primary }}
        thumbColor={values[name] ? colors.secondary : colors.medium}
        onValueChange={(value) => setFieldValue(name, value)}
        value={values[name]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
  },
  label: {
    marginRight: 20,
    color: defaultStyles.colors.black,
  },
});
