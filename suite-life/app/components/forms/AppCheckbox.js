import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { CheckBox } from "react-native-elements";

export default function AppCheckbox({ name, ...otherProps }) {
  const { setFieldValue, values } = useFormikContext();

  return (
    <>
      <CheckBox
        checked={values.check}
        onPress={() => setFieldValue(name, !values.check)}
        {...otherProps}
      />

      
    </>
  );
}