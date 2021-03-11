import React from "react";
import {
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../../components/forms";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import { auth } from "../../components/firebase/firebase";
import {
  createSuite,
  createUser,
  checkSuiteExists,
  updateUserSuite,
  checkUserExists,
  addUserToSuite,
} from "../../components/firebase/suites";

import AppTitle from "../../components/AppTitle";
import routes from "../../navigation/routes";

const validationSchema = Yup.object().shape({
  suiteName: Yup.string().required().min(1).label("Suite Name"),
});

export default function CreateSuiteScreen({ route, navigation }) {
  function registerUser(values) {
    console.log("params:", route.params);

    const suiteID = Math.floor(Math.random() * 90000000) + 10000000;
    const uid = auth.currentUser.uid;
    Promise.all([checkSuiteExists(suiteID), checkUserExists(uid)])
      .then((res) => {
        console.log("RES:", res);
        const suiteExists = res[0];
        const userExists = res[1];
        if (!suiteExists && !userExists) {
          createSuite(suiteID, values.suiteName);
          createUser(uid, route.params.name, route.params.pronouns, suiteID);
          addUserToSuite(suiteID, uid);
        } else if (suiteExists && !userExists) {
          Alert.alert("We're sorry, something went wrong. Please try again.");
        } else if (userExists) {
          Alert.alert("An account with these credentials already exists.");
        }
      })
      .catch((err) => {
        console.log("Registration Error:", err);
      });
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.deleteIconContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(routes.JOIN_SUITE)}
          >
            <MaterialCommunityIcons
              name="keyboard-backspace"
              color={colors.medium}
              size={30}
            />
          </TouchableWithoutFeedback>
        </View>
        <AppTitle style={styles.title}>Create a Suite</AppTitle>
      </View>
      <Form
        initialValues={{ suiteName: "" }}
        onSubmit={(values) => {
          registerUser(values);
        }}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
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
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 10,
  },
  createSuiteText: {
    color: colors.primary,
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
  spacer: {
    height: 20,
  },
});
