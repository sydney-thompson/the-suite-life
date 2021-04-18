import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { TextInput } from "react-native";
import AppText from "../AppText";
import Screen from "../Screen";
import { auth, db } from "../firebase/firebase";
import * as Yup from "yup";
import { disconnectFromSuitemates, getSuitemates } from "../firebase/suites";
import { getUserData } from "../firebase/users";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../../config/styles";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormFieldCheckbox as Checkbox,
  AppFormPicker as FormPicker,
  AppFormRadioButton as RadioButton,
  SubmitButton,
} from "./";
import colors from "../../config/colors";
import AppTitle from "../AppTitle";
import HorizontalSpaceSeparator from "../HorizontalSpaceSeparator";
import daysOfWeek from "../../config/daysOfWeek";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  details: Yup.string().label("Details"),
  // day: Yup.string().required().label("Day of Week"),
});

export default function ChoreForm({ initialValues, onSubmit }) {
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, [auth]);

  useEffect(() => {
    if (user) {
      getSuitemates(setSuitemates, user.suiteID);
    } else {
      setSuitemates([]);
    }
    return () => {
      disconnectFromSuitemates();
    };
  }, [user, setSuitemates]);

  return (
    <Form
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      validationSchema={validationSchema}
    >
      <FormField
        display="AppTextInputLabel"
        label="Name"
        autoCapitalize="none"
        autoCorrect={false}
        name="name"
        placeholder="Chore Name"
      />
      <FormField
        display="AppTextInputLabel"
        label="Details"
        autoCapitalize="none"
        autoCorrect={false}
        name="details"
        placeholder="Additional details"
        multiline
        numberOfLines={6}
      />
      <FormPicker
        name="day"
        label="Day of Week"
        items={daysOfWeek}
        placeholder="Day of Week"
      />
      <RadioButton label="Repeat Weekly" name="recurring" />
      <AppText style={styles.suitemates}>Select suitemates assigned:</AppText>
      <View style={styles.checklistContainer}>
        <FlatList
          data={suitemates}
          keyExtractor={(suitemate) => suitemate.id.toString()}
          renderItem={({ item }) => (
            <Checkbox
              name="assignees"
              suitemate={item.id}
              key={item.id}
              checkedIcon="check-box"
              iconType="material"
              uncheckedIcon="check-box-outline-blank"
              title={item.name}
            />
          )}
          ItemSeparatorComponent={HorizontalSpaceSeparator}
        />
      </View>
      <SubmitButton title="Save" />
    </Form>
  );
}

const styles = StyleSheet.create({
  checklistContainer: {
    flex: 1,
    width: "100%",
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
  save: {
    color: colors.primary,
    justifyContent: "flex-end",
  },
  saveContainer: {
    position: "absolute",
    right: 10,
  },
  screen: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  suitemates: {
    margin: 10,
    color: defaultStyles.colors.black,
  },
});
