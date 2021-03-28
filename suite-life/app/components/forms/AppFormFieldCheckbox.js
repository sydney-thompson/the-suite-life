import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { CheckBox } from "react-native-elements";

export default function AppFormFieldCheckbox({ name, ...otherProps }) {
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

// reminder to delete AppCheckbox and CHeckbox item if no longer needed

