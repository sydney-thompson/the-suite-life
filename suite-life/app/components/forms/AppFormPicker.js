import React from "react";
import { StyleSheet, View } from "react-native";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";
import AppText from "../text/AppText";

import defaultStyles from "../../config/styles";

export default function AppFormPicker({ name, label = null, ...otherProps }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <View style={styles.container}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <AppPicker
        onSelectItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  label: {
    marginRight: 20,
    color: defaultStyles.colors.black,
  },
});
