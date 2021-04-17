import React from "react";
import { StyleSheet, View } from "react-native";
import { useFormikContext } from "formik";
import { CheckBox } from "react-native-elements";

import ErrorMessage from "./ErrorMessage";
import defaultStyles from "../../config/styles";

export default function AppFormFieldCheckbox({
  name,
  suitemate,
  ...otherProps
}) {
  const { setFieldValue, values } = useFormikContext();

  const updateValue = () => {
    let currentValues = values[name];
    currentValues[suitemate] = !values[name][suitemate];
    setFieldValue(name, currentValues);
  };

  return (
    <>
      <CheckBox
        checked={values[name][suitemate]}
        onPress={() => updateValue()}
        textStyle={[defaultStyles.text, styles.text]}
        {...otherProps}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: defaultStyles.colors.black,
    fontWeight: "normal",
  },
});
