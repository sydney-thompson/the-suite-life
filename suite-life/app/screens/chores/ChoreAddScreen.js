import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { auth, db } from "../../components/firebase/firebase";
import * as choreFunctions from "../../components/firebase/chores";
import * as Yup from "yup";
import {
  disconnectFromSuitemates,
  getSuitemates,
} from "../../components/firebase/suites";
import { getUserData } from "../../components/firebase/users";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../../config/styles";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormFieldCheckbox as Checkbox,
  SubmitButton,
} from "../../components/forms";
import ChoreForm from "../../components/forms/ChoreForm";
import colors from "../../config/colors";
import AppTitle from "../../components/AppTitle";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  frequency: Yup.string().required().label("Frequency"),
  details: Yup.string().label("Details"),
});

export default function ChoreAddScreen({ navigation }) {
  const initialValues = {
    details: "",
    name: "",
    assignees: {
      "3W6ZDlPdDhWmPxvPGVBSa9U3A4l2": false,
      "8lh1VeoQrtb3gAWFEDt7Dfbwvzd2": false,
      IdIiDUvCu9bnb5QkdwmThJoAi863: false,
      SbyVXqeCisX8IvEnZosxFHytqw53: false,
      b3q3PcKIfdgUapdHbkCLgsUtWQ83: false,
      mJNOAnpK4ZTF5v9MeLSFa5nqCrH3: false,
      yjGDsdtY9jNjjpyMaEWHFFzhQa43: false,
      z0Ax8ZANZdSZNFdr3o7TeDdDAal2: false,
    },
    recurring: false,
    day: null,
  };

  function addChore(values) {
    console.log("values:", values);
    // Send values to firebase and navigate back
    choreFunctions.addNewChore({
      assignees: values.assignees,
      completed: false,
      day: values.day.label,
      details: values.details,
      name: values.name,
      recurring: values.recurring,
    });
    navigation.goBack();
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.deleteIconContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="close"
              color={colors.medium}
              size={30}
            />
          </TouchableWithoutFeedback>
        </View>
        <AppTitle style={defaultStyles.title}>New Chore</AppTitle>
      </View>
      <ChoreForm initialValues={initialValues} onSubmit={addChore} />
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
  deleteIconContainer: {
    position: "absolute",
    left: 10,
  },
  screen: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
