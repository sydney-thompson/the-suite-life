import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import TextInput2 from "../../components/TextInput2";
import Screen from "../../components/Screen";
import * as Yup from "yup";
import * as paymentFunctions from "../../components/firebase/payments";

import defaultStyles from "../../config/styles";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormFieldCheckbox as Checkbox,
  SubmitButton,
} from "../../components/forms";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  amount: Yup.number().required().positive().label("Amount"),
  payer: Yup.string().required().label("Payer"),
  details: Yup.string().label("Details")
});

export default function PaymentAddScreen({navigation}) {
  const AddTransaction = (values) => {
    // Send values to firebase and navigate back

    paymentFunctions.addNewPayment({
      'title': values.title,
      'amount': values.amount,
      'payer': values.payer,
      'payees': values.payees,
      'details': values.details,
      'completed': false
    })
    navigation.goBack()
  }
  const housemates = [{id: 'id1', name: 'Name 1'}, {id: 'id2', name: 'Name 2'}];    // placeholders for reading in the housemates of that suite
  const initialhousemates = {'id1': false, 'id2': false};

  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>New Transaction</AppText>
      <Form
        initialValues={{ title: "", amount: "", payer: "", payees: initialhousemates, details: ""}}
        onSubmit={(values) => AddTransaction(values)}
        validationSchema={validationSchema}
      >
        <ScrollView style={{width: '100%'}}>
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
          label="Payer"
          autoCapitalize="none"
          autoCorrect={false}
          name="payer"
          placeholder="Who payed for the item?"
        />
        <FormField
          display="AppTextInputLabel"
          label="Details"
          autoCapitalize="none"
          autoCorrect={false}
          name="details"
          placeholder="Additional details"
        />
        <AppText style={[{color: defaultStyles.colors.black}]}>Select housemates who owe:</AppText>
        <View>
        {housemates.map((housemate) => {
          return (
            <Checkbox
              name="payees"
              specificName={housemate.id}
              checkedIcon='check-box'
              iconType='material'
              uncheckedIcon='check-box-outline-blank'
              title={housemate.name}
            />
          );
        })}
        </View>
        </ScrollView>
        <SubmitButton title="Save Transaction" />
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  container: {  // container for suite member icons
    backgroundColor: defaultStyles.colors.white,
    borderStyle: "solid",
    borderColor: defaultStyles.colors.black,
    borderWidth: 2,
    borderRadius: 25,
    flexDirection: "row",
    width: "90%",
    padding: 30,
    marginVertical: 1,
    alignItems: "center",
  },
});
