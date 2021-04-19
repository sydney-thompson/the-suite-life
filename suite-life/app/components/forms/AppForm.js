import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";

export default function AppForm({
  enableReinitialize = false,
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) {
  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

const styles = StyleSheet.create({});
