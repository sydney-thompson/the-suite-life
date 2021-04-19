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
import HorizontalSpaceSeparator from "../../components/HorizontalSpaceSeparator";
import ChoreForm from "../../components/forms/ChoreForm";
import daysOfWeek from "../../config/daysOfWeek";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  details: Yup.string().label("Details"),
  // day: Yup.string().required().label("Day of Week"),
});

export default function ChoreEditScreen(choreInfo) {
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);
  const [chore, setChore] = useState(choreInfo.route.params.chore);

  const initialDay = daysOfWeek.filter((item) => {
    return item.label === chore.day;
  })[0];
  const initialValues = {
    details: chore.details,
    name: chore.name,
    assignees: chore.assignees,
    recurring: chore.recurring,
    day: initialDay,
  };

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
  function submitEdits(values) {
    if (user) {
      choreFunctions
        .updateChore(values, chore.id, user.suiteID)
        .then((res) => {
          returnHome();
        })
        .catch((err) => {
          console.error("HERE:", err);
          Alert.alert("Something went wrong in here. Try again.");
        });
    } else {
      Alert.alert("Something went wrong. Try again.");
    }
  }

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
      <ChoreForm initialValues={initialValues} onSubmit={submitEdits} />
    </Screen>
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
