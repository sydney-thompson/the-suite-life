import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { googleLogout } from "../../components/auth/googleAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../../components/forms";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import { auth } from "../../components/firebase/firebase";
import { updateUserDetails } from "../../components/firebase/users";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  pronouns: Yup.string().optional().label("Pronouns"),
});

export default function AccountEditScreen({ route, navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.goBackContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="close"
              color={colors.medium}
              size={30}
            />
          </TouchableWithoutFeedback>
        </View>
        <AppTitle style={styles.title}>Edit Account</AppTitle>
      </View>
      <Form
        initialValues={{
          name: route.params.name,
          pronouns: route.params.pronouns,
        }}
        onSubmit={(values) => {
          updateUserDetails(auth.currentUser.uid, values.name, values.pronouns)
            .then(() => {
              navigation.goBack();
            })
            .catch((err) => {
              console.log("err:", err);
            });
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
        <SubmitButton title="Update" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  screen: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    width: "100%",
  },
  buttonText: {
    color: colors.black,
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    padding: 10,
    top: 200,
  },
  input: {
    height: 425,
    width: 300,
    paddingTop: 30,
    paddingBottom: 0,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 25,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "stretch",
    backgroundColor: "#FFFFF0",
  },
  tagline: {
    color: colors.black,
    fontSize: 50,
    fontWeight: "bold",
    lineHeight: 25,
    paddingLeft: 40,
    paddingTop: 75,
  },
  textTitle: {
    color: colors.black,
    fontSize: 18,
    lineHeight: 15,
    paddingLeft: 30,
  },
  titleContainer: {
    alignItems: "flex-start",
    position: "absolute",
    top: 0,
  },
});
