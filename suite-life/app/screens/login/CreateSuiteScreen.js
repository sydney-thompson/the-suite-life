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
import {auth, createSuite} from "../../components/firebase/firebase"

const validationSchema = Yup.object().shape({
  suiteName: Yup.string().required().min(4).label("Suite Name"),
});

export default function CreateSuiteScreen() {
  return (
    <Screen style={styles.container}>
      <AppText style={styles.headerText}>Name your new suite!</AppText>
      <Form
        initialValues={{ suiteName: "" }}
        onSubmit={(values) => {
          console.log(values.suiteName);
          createSuite(Math.floor(Math.random() * 1000000000), values.suiteName);
        }}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="home-modern"
          name="suiteName"
          placeholder="Suite Name"
        />
        <View style={styles.spacer} />
        <SubmitButton title="Create Suite" />
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
