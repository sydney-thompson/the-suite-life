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
  title: Yup.string().required().label("Title"),
  amount: Yup.number().required().positive().label("Amount"),
  payer: Yup.object().required().label("Payer"),
  details: Yup.string().label("Details"),
});

export default function PaymentForm({ initialValues, onSubmit }) {
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
        label="Title"
        autoCapitalize="none"
        autoCorrect={false}
        name="title"
        placeholder="What is this for?"
      />
      <FormField
        display="AppTextInputLabel"
        label="Amount"
        autoCapitalize="none"
        autoCorrect={false}
        name="amount"
        placeholder="Amount payed"
      />
      <FormField
        display="AppTextInputLabel"
        label="Details"
        autoCapitalize="none"
        autoCorrect={false}
        name="details"
        placeholder="Additional details"
        multiline
        maxHeight={200}
        numberOfLines={6}
      />
      <FormPicker
        name="payer"
        label="Payer"
        items={suitemates}
        placeholder="Who paid?"
      />
      <AppText style={styles.suitemates}>Select suitemates assigned:</AppText>
      <View style={styles.checklistContainer}>
        <FlatList
          data={suitemates}
          keyExtractor={(suitemate) => suitemate.id.toString()}
          renderItem={({ item }) => (
            <Checkbox
              name="payees"
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
