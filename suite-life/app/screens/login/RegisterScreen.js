import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "../../components/AppButton";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../../components/forms";
import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import { googleLogin } from "../../components/auth/googleAuth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  pronouns: Yup.string().optional().label("Pronouns"),
  suiteCode: Yup.string()
    .optional()
    .min(10, "Suite code is exactly 10 characters")
    .max(10, "Suite code is exactly 10 characters")
    .label("Suite Code"),
});

export default function RegisterScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.deleteIconContainer}>
          <MaterialCommunityIcons
            name="close"
            color={colors.medium}
            size={30}
          />
        </View>
        <AppTitle style={styles.title}>Sign Up</AppTitle>
        <TouchableWithoutFeedback onPress={() => googleLogin()}>
          <AppText style={styles.login}>Login</AppText>
        </TouchableWithoutFeedback>
      </View>
      <Form
        initialValues={{
          name: "",
          pronouns: "",
          suiteCode: "",
          // email: "",
          // password: "",
        }}
        onSubmit={(values) => {
          successCallback = () => {
            console.log(values);
          };
          failureCallback = () => {};
          googleLogin().then(successCallback, failureCallback);
        }}
        validationSchema={validationSchema}
      >
        <FormField autoCorrect={false} name="name" placeholder="Name" />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="pronouns"
          placeholder="Pronouns (optional)"
        />
        <FormField
          autoCorrect={false}
          name="suiteCode"
          placeholder="Suite Code (optional)"
        />
        {/* <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        /> */}
        <View style={styles.spacer} />
        <SubmitButton title="sign up using google" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  deleteIconContainer: {
    position: "absolute",
    left: 10,
  },
  login: {
    color: colors.primary,
    position: "absolute",
    right: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  spacer: {
    height: 20,
  },
  title: {
    marginBottom: 10,
  },
});
