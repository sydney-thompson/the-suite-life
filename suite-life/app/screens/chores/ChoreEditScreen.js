import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
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

import defaultStyles from "../../config/styles";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormFieldCheckbox as Checkbox,
  SubmitButton,
} from "../../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  frequency: Yup.string().required().label("Frequency"),
  details: Yup.string().label("Details"),
});

export default function ChoreEditScreen(choreInfo) {
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);
  const [initialhousemates, setIHmates] = useState({});
  const [chore, setChore] = useState(choreInfo.route.params.chore);
  console.log("chore:", chore);

  // navigates back to main screen
  const returnHome = () => {
    const navigator = choreInfo.route.params.navigation;
    navigator.goBack();
  };

  // deletes chore from firebase then returns to main screen
  const deleteChore = () => {
    choreFunctions.deleteChore(chore.firebaseID);
    returnHome();
  };

  // sends data to firebase and clears the textbox values
  const submitAndClear = async (values) => {
    await choreFunctions.updateChore(values, choreInfo.route.params.firebaseID);
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
      <AppText style={defaultStyles.title}>Edit Chore</AppText>
      <Form
        initialValues={{
          name: chore.name,
          frequency: chore.frequency,
          // assignees: initialhousemates,
          details: choreDetails,
        }}
        onSubmit={(values) => submitAndClear(values)}
        validationSchema={validationSchema}
      >
        <ScrollView style={{ width: "100%" }}>
          <FormField
            display="AppTextInputLabel"
            label="Name"
            autoCapitalize="none"
            autoCorrect={false}
            name="name"
            placeholder="Name of the chore"
          />
          <FormField
            display="AppTextInputLabel"
            label="Frequency"
            autoCapitalize="none"
            autoCorrect={false}
            name="frequency"
            placeholder="One-time or weekly?"
          />
          <FormField
            display="AppTextInputLabel"
            label="Details"
            autoCapitalize="none"
            autoCorrect={false}
            name="details"
            placeholder="Additional details"
          />
          <AppText style={[{ color: defaultStyles.colors.black }]}>
            Select housemates assigned:
          </AppText>
          <View>
            {suitemates.map((mate) => {
              return (
                <Checkbox
                  name="assignees"
                  specificName={mate.id}
                  key={mate.id}
                  checkedIcon="check-box"
                  iconType="material"
                  uncheckedIcon="check-box-outline-blank"
                  title={mate.name}
                />
              );
            })}
          </View>
        </ScrollView>
        <SubmitButton title="Save Chore" />
      </Form>
      <AppButton
        title="Cancel"
        color="primary"
        onPress={returnHome}
      ></AppButton>
      <AppButton
        title="Delete Chore"
        color="secondary"
        onPress={deleteChore}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
