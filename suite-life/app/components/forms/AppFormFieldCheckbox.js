import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { CheckBox } from "react-native-elements";

export default function AppFormFieldCheckbox({ name, specificName, ...otherProps }) {
  const { setFieldValue, values } = useFormikContext();

  const updateValue = () => {
    const specvalues = values[name];
    const specCurrent = values[name][specificName];
    specvalues[specificName] = !specCurrent;
    setFieldValue(name, specvalues);
  }

  return (
    <>
      <CheckBox
        checked={values[name][specificName]}
        onPress={() => updateValue()}
        {...otherProps}
      />
    </>
  );
}
