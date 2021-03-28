import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
  payer: Yup.string().required().label("Payer")
});

export default function PaymentAddScreen({navigation}) {
  const AddTransaction = (values) => {
    // Send values to firebase and navigate back
    // console.log(values);
    paymentFunctions.addNewPayment({
      'title': values.title,
      'amount': values.amount,
      'payer': values.payer,
      'payees': 'empty',  // fill in once you have these fields!!
      'details': 'empty', // ^^^^^^^
      'completed': false
    })
    navigation.goBack()
  }
  const housemates = [{name: 'Name 1'}, {name: 'Name 2'}];    // placeholder for reading in the housemates of that suite

  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>New Transaction</AppText>
      <Form
        initialValues={{ title: "", amount: "", payer: "", check: false }}
        onSubmit={(values) => AddTransaction(values)}
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
          label="Payer"
          autoCapitalize="none"
          autoCorrect={false}
          name="payer"
          placeholder="Who payed for the item?"
        />
        <AppText>Select housemates who owe:</AppText>
        <View role="group">
        <Checkbox
          name="check"
          checkedIcon='check-box'
          iconType='material'
          uncheckedIcon='check-box-outline-blank'
          title='TEST'
          checkedTitle='TESTOOOP'
        />
        </View>
        <SubmitButton title="Save Transaction" />
      </Form>
    </Screen>
  );
};

/*<View role="group">
          {housemates.map((housemate) => {
          return (
            <AppText>
            <Checkbox name="checked" value={housemate.name} />
            {housemate.name}
            </AppText>
          );
          })}
        </View>


      onPress={() => setFieldValue('check', !values.check)}
*/

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
