import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../../components/forms";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      {/* <Image style={styles.logo} source={require("../../assets/favicon.png")} /> */}
      <AppText style={styles.welcomeText}>Hello, welcome back!</AppText>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
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
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => console.log("Forgot password tapped")}
          >
            <AppText style={styles.forgotPasswordText}>
              Forgot Password?
            </AppText>
          </TouchableOpacity>
        </View>
        <SubmitButton title="Log In" />
      </Form>
      <View style={styles.createAccountContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.REGISTER)}>
          <AppText style={styles.createAccountText}>Create Account</AppText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    padding: 10,
  },
  createAccountContainer: {
    alignItems: "center",
  },
  createAccountText: {
    color: colors.white,
    fontSize: 20,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: colors.tertiary,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  welcomeText: {
    color: colors.white,
    fontFamily: "Times New Roman",
    fontSize: 40,
    marginTop: 20,
    marginBottom: 20,
  },
});
