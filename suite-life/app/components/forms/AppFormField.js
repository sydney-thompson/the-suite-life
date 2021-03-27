import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppTextInputLabel from "../AppTextInput_Label";
import ErrorMessage from "./ErrorMessage";

export default function AppFormField({ name, display, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  const components_map = {
    "AppTextInputLabel": AppTextInputLabel,
    "AppTextInput": AppTextInput
  };
  const DisplayComp = components_map[display];
  return (
    <>
      <DisplayComp
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({});
