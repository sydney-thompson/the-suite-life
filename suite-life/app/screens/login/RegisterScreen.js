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
import AppText from "../../components/text/AppText";
import AppTitle from "../../components/text/AppTitle";
import colors from "../../config/colors";
import { googleLogin, googleLogout } from "../../components/auth/googleAuth";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import RegistrationContext from "../../components/auth/RegistrationContext";
import { checkUserExists } from "../../components/firebase/users";
import {
  createTestSuite,
  switchSuiteID,
} from "../../components/firebase/suites";
import UserDetailsForm from "../../components/forms/UserDetailsForm";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  pronouns: Yup.string().optional().label("Pronouns"),
});

export default function RegisterScreen({ navigation }) {
  const onSubmit = (values) => {
    const successCallback = () => {
      navigation.navigate(routes.JOIN_SUITE, values);
    };
    const failureCallback = () => {};
    googleLogin().then(successCallback, failureCallback);
  };

  return (
    <RegistrationContext.Consumer>
      {(context) => (
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
                  googleLogin().then((res) => {
                    checkUserExists(res.user.uid)
                      .then((res) => {
                        if (res) {
                          context.setRegistered(true);
                        } else {
                          googleLogout();
                          Alert.alert("This account does not exist.");
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  }, failureCallback);
                }}
              >
                <AppText style={styles.login}>Log In</AppText>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <UserDetailsForm
            initialValues={{ name: "", pronouns: "" }}
            onSubmit={onSubmit}
          />
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
