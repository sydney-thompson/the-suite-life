import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
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
import AppText from "../../components/text/AppText";
import routes from "../../navigation/routes";
import AppTitle from "../../components/text/AppTitle";
import { auth } from "../../components/firebase/firebase";
import {
  checkSuiteExists,
  addUserToSuite,
} from "../../components/firebase/suites";
import { createUser, checkUserExists } from "../../components/firebase/users";
import RegistrationContext from "../../components/auth/RegistrationContext";

const validationSchema = Yup.object().shape({
  suiteID: Yup.string()
    .required()
    .min(8, "Code is exactly 8 characters")
    .max(8, "Code is exactly 8 characters")
    .label("Suite Code"),
});

export default function JoinSuiteScreen({ route, navigation }) {
  function addUserToFirebase(uid, name, pronouns, suiteID) {
    return new Promise((resolve, reject) => {
      createUser(uid, name, pronouns, suiteID);
      addUserToSuite(suiteID, uid);
    });
  }

  function registerUser(values, setRegistered) {
    const uid = auth.currentUser.uid;
    const photoURL = auth.currentUser.photoURL;
    return new Promise((resolve, reject) => {
      Promise.all([checkSuiteExists(values.suiteID), checkUserExists(uid)])
        .then((res) => {
          const suiteExists = res[0];
          const userExists = res[1];
          if (suiteExists && !userExists) {
            console.log("creating user");
            createUser(
              uid,
              route.params.name,
              route.params.pronouns,
              photoURL,
              values.suiteID
            ).then((res) => {
              console.log("adding user to suite");
              addUserToSuite(values.suiteID, uid).then((res) => {
                console.log("user added");
              });
              resolve(true);
            });
          } else if (userExists) {
            Alert.alert("An account with these credentials already exists.");
            reject(false);
          } else if (!suiteExists) {
            Alert.alert("Invalid suite code - suite does not exist.");
            reject(false);
          }
        })
        .catch((err) => {
          console.error("Registration Error:", err);
          reject(false);
        });
    });
  }

  return (
    <RegistrationContext.Consumer>
      {(setRegistered) => (
        <Screen style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.deleteIconContainer}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate(routes.REGISTER)}
              >
                <MaterialCommunityIcons
                  name="keyboard-backspace"
                  color={colors.medium}
                  size={30}
                />
              </TouchableWithoutFeedback>
            </View>
            <AppTitle style={styles.title}>Join a Suite</AppTitle>
          </View>
          <Form
            initialValues={{ suiteID: "" }}
            onSubmit={(values) => {
              registerUser(values, setRegistered.setRegistered)
                .then((res) => {
                  console.log("res:", res);
                  navigation.navigate(routes.RULES);
                })
                .catch((err) => {
                  console.log("err:", err);
                });
            }}
            validationSchema={validationSchema}
          >
            <FormField
              autoCorrect={false}
              name="suiteID"
              placeholder="Suite Code"
            />
            <View style={styles.spacer} />
            <SubmitButton title="Join Suite" />
          </Form>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.CREATE_SUITE, route.params)
            }
          >
            <AppText style={styles.createSuiteText}>Create Suite</AppText>
          </TouchableOpacity>
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
  createSuiteText: {
    color: colors.primary,
  },
  deleteIconContainer: {
    position: "absolute",
    left: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  spacer: {
    height: 20,
  },
});
