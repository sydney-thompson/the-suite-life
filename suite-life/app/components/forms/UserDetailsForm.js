import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  pronouns: Yup.string().optional().label("Pronouns"),
});

export default function UserDetailsForm({ initialValues, onSubmit }) {
  return (
    <Form
      enableReinitialize={true}
      initialValues={{
        name: initialValues.name,
        pronouns: initialValues.pronouns,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <FormField autoCorrect={false} name="name" placeholder="Name" />
      <FormField
        autoCapitalize="none"
        autoCorrect={false}
        name="pronouns"
        placeholder="Pronouns (optional)"
      />
      <View style={styles.spacer} />
      <SubmitButton title="Update" />
    </Form>
  );
}

const styles = StyleSheet.create({});
