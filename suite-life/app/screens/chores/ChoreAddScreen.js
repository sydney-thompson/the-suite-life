import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { TextInput } from 'react-native';
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { db } from "../../components/firebase/firebase";
import * as choreFunctions from "../../components/firebase/chores";
import * as Yup from "yup";

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
  details: Yup.string().label("Details")
});

export default function ChoreAddScreen({navigation}) {
  const AddChore = (values) => {
    // Send values to firebase and navigate back

    choreFunctions.addNewChore({
      'name': values.name,
      'frequency': values.frequency,
      'assignees': values.assignees,
      'details': values.details,
      'completed': false
    })
    navigation.goBack()
  }
  const housemates = [{id: 'id1', name: 'Name 1'}, {id: 'id2', name: 'Name 2'}];    // placeholders for reading in the housemates of that suite
  const initialhousemates = {'id1': false, 'id2': false};

  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>New Chore</AppText>
      <Form
        initialValues={{ name: "", frequency: "", assignees: initialhousemates, details: ""}}
        onSubmit={(values) => AddChore(values)}
        validationSchema={validationSchema}
      >
        <ScrollView style={{width: '100%'}}>
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
        <AppText style={[{color: defaultStyles.colors.black}]}>Select housemates assigned:</AppText>
        <View>
        {housemates.map((housemate) => {
          return (
            <Checkbox
              name="assignees"
              specificName={housemate.id}
              key={housemate.id}
              checkedIcon='check-box'
              iconType='material'
              uncheckedIcon='check-box-outline-blank'
              title={housemate.name}
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
        onPress={() => navigation.goBack()}
      ></AppButton>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
