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
  goBackContainer: {
    position: "absolute",
    left: 10,
  },
  login: {
    color: colors.primary,
    justifyContent: "flex-end",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  screen: {
    alignItems: "center",
  },
  spacer: {
    height: 20,
  },
  title: {
    marginBottom: 10,
  },
});
