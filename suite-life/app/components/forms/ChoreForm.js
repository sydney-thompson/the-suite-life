import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import * as Yup from "yup";

import AppText from "../text/AppText";
import { auth } from "../firebase/firebase";
import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormFieldCheckbox as Checkbox,
  AppFormPicker as FormPicker,
  AppFormRadioButton as RadioButton,
  SubmitButton,
} from "./";
import colors from "../../config/colors";
import daysOfWeek from "../../config/daysOfWeek";
import defaultStyles from "../../config/styles";
import HorizontalSpaceSeparator from "../lists/HorizontalSpaceSeparator";
import { disconnectFromSuitemates, getSuitemates } from "../firebase/suites";
import { getUserData } from "../firebase/users";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  details: Yup.string().label("Details"),
  // day: Yup.string().required().label("Day of Week"),
});

export default function ChoreForm({ initialValues, onSubmit }) {
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUserData().then((val) => {
        setUser(val);
      });
    }
    return () => (mounted = false);
  }, [auth]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (user) {
        getSuitemates(setSuitemates, user.suiteID);
        console.log("suitemates:", suitemates.length);
      } else {
        setSuitemates([]);
      }
    }
    return () => {
      mounted = false;
      disconnectFromSuitemates();
    };
  }, [user, setSuitemates]);

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
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
        maxHeight={200}
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
