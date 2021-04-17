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
  AppFormPicker as FormPicker,
  AppFormRadioButton as RadioButton,
  SubmitButton,
} from "../../components/forms";
import colors from "../../config/colors";
import AppTitle from "../../components/AppTitle";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  details: Yup.string().label("Details"),
  // day: Yup.string().required().label("Day of Week"),
});

const daysOfWeek = [
  { id: 1, label: "Monday" },
  { id: 2, label: "Tuesday" },
  { id: 3, label: "Wednesday" },
  { id: 4, label: "Thursday" },
  { id: 5, label: "Friday" },
  { id: 6, label: "Saturday" },
  { id: 7, label: "Sunday" },
];

export default function ChoreEditScreen(choreInfo) {
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);
  const [initialhousemates, setIHmates] = useState({});
  const [chore, setChore] = useState(choreInfo.route.params.chore);

  const initialDay = daysOfWeek.filter((item) => {
    return item.label === chore.day;
  })[0];

  // navigates back to main screen
  const returnHome = () => {
    const navigator = choreInfo.route.params.navigation;
    navigator.goBack();
  };

  // deletes chore from firebase then returns to main screen
  const deleteChore = () => {
    choreFunctions.deleteChore(chore.id);
    returnHome();
  };

  // sends data to firebase and clears the textbox values
  const submitAndClear = async (values) => {
    await choreFunctions.updateChore(values, chore.id);
    setChoreRefresher("False");
    returnHome();
  };

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, [auth]);

  useEffect(() => {
    if (user) {
      getSuitemates(setSuitemates, user.suiteID);
      let checkvalues = {};
      suitemates.forEach((mate) => {
        checkvalues[mate.id] = false;
      });
      setIHmates(checkvalues);
    } else {
      setSuitemates([]);
      setIHmates({});
    }
    return () => {
      disconnectFromSuitemates();
    };
  }, [user, setSuitemates, setIHmates]);

  return (
    <Screen style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.deleteIconContainer}>
          <TouchableWithoutFeedback onPress={returnHome}>
            <MaterialCommunityIcons
              name="close"
              color={colors.medium}
              size={30}
            />
          </TouchableWithoutFeedback>
        </View>
        <AppTitle style={defaultStyles.title}>Edit Chore</AppTitle>
        <View style={styles.saveContainer}>
          <TouchableWithoutFeedback onPress={deleteChore}>
            <MaterialCommunityIcons
              name="delete"
              color={colors.danger}
              size={30}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Form
        initialValues={{
          details: chore.details,
          name: chore.name,
          assignees: chore.assignees,
          recurring: chore.recurring,
          day: initialDay,
        }}
        onSubmit={(values) => {
          console.log("values:", values);
        }}
        validationSchema={validationSchema}
      >
        <ScrollView style={{ width: "100%" }}>
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
          />
          <FormPicker
            name="day"
            label="Day of Week"
            items={daysOfWeek}
            placeholder="Day of Week"
          />
          <RadioButton label="Repeat Weekly" name="recurring" />
          <AppText style={styles.suitemates}>
            Select suitemates assigned:
          </AppText>
          <View>
            {suitemates.map((suitemate) => {
              console.log("len(suitemates):", suitemates.length);
              return (
                <Checkbox
                  name="assignees"
                  suitemate={suitemate.id}
                  key={suitemate.id}
                  checkedIcon="check-box"
                  iconType="material"
                  uncheckedIcon="check-box-outline-blank"
                  title={suitemate.name}
                />
              );
            })}
          </View>
        </ScrollView>
        <SubmitButton title="Save" />
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
    alignItems: "center",
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
