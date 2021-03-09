import React from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../../components/forms";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";

const validationSchema = Yup.object().shape({
  suiteCode: Yup.string()
    .required()
    .min(10, "Code is exactly 10 characters")
    .max(10, "Code is exactly 10 characters")
    .label("Suite Code"),
});

export default function JoinSuiteScreen() {
  return (
    <Screen style={styles.container}>
      <AppText style={styles.headerText}>Enter your suite code!</AppText>
      <Form
        initialValues={{ suiteCode: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="home-modern"
          name="suiteCode"
          placeholder="Suite Code"
        />
        <View style={styles.spacer} />
        <SubmitButton title="Join Suite" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    padding: 10,
    paddingTop: 40,
  },
  headerText: {
    color: colors.white,
    fontFamily: "Times New Roman",
    fontSize: 35,
    marginBottom: 20,
  },
  spacer: {
    flex: 1,
  },
});
