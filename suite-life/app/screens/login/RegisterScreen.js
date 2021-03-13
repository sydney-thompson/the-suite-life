import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../../components/forms";
import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import colors from "../../config/colors";
import { googleLogin, googleLogout } from "../../components/auth/googleAuth";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import RegistrationContext from "../../components/auth/RegistrationContext";
import { checkUserExists } from "../../components/firebase/firebase";
import { auth } from "firebase";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  pronouns: Yup.string().optional().label("Pronouns"),
});

export default function RegisterScreen({ navigation }) {
  return (
    <RegistrationContext.Consumer>
      {(setRegistered) => (
        <Screen style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.deleteIconContainer}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate(routes.WELCOME)}
              >
                <MaterialCommunityIcons
                  name="close"
                  color={colors.medium}
                  size={30}
                />
              </TouchableWithoutFeedback>
            </View>
            <AppTitle style={styles.title}>Sign Up</AppTitle>
            <View style={styles.loginContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  const failureCallback = () => {};
                  googleLogin().then(() => {
                    checkUserExists()
                      .then((res) => {
                        if (res) {
                          setRegistered.setRegistered(true);
                        } else {
                          googleLogout();
                          Alert.alert("This account does not exist.");
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }, failureCallback);
                }}
              >
                <AppText style={styles.login}>Log In</AppText>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <Form
            initialValues={{
              name: "",
              pronouns: "",
            }}
            onSubmit={(values) => {
              const successCallback = () => {
                navigation.navigate(routes.JOIN_SUITE, values);
              };
              const failureCallback = () => {};
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
            <View style={styles.spacer} />
            <SubmitButton title="Create Account" />
          </Form>
        </Screen>
      )}
    </RegistrationContext.Consumer>
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
    justifyContent: "flex-end",
  },
  loginContainer: {
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
