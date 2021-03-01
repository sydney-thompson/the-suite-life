import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

export default function SubmitButton({ title, color = "black" }) {
  const { handleSubmit } = useFormikContext();
  return <AppButton title={title} onPress={handleSubmit} color={color} />;
}

const styles = StyleSheet.create({});
