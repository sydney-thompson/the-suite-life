import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../../components/forms";
import colors from "../../config/colors";
import AppButton from "../../components/AppButton";
import routes from "../../navigation/routes";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function RegisterScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/favicon.png")} />
      <Form
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <View style={styles.spacer} />
        {/* <SubmitButton title="Join Suite" color={"primary"} />
        <SubmitButton title="Create Suite" /> */}
        <AppButton
          title="Join Suite"
          color="primary"
          onPress={() => navigation.navigate(routes.JOIN_SUITE)}
        />
        <AppButton
          title="Create Suite"
          color="black"
          onPress={() => navigation.navigate(routes.CREATE_SUITE)}
        />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  spacer: {
    flex: 1,
  },
});
