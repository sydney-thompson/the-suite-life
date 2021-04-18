import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import TextInput2 from "../../components/TextInput2";
import Screen from "../../components/Screen";
import { auth, db } from "../../components/firebase/firebase";
import * as Yup from "yup";
import * as paymentFunctions from "../../components/firebase/payments";
import {disconnectFromSuitemates, getSuitemates} from "../../components/firebase/suites"; 
import { getUserData } from "../../components/firebase/users";

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
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);
  const [initialhousemates, setIHmates] = useState({});

  const AddTransaction = async(values) => {
    // Send values to firebase and navigate back

    // check payer_id
    var payer_id = await paymentFunctions.check_payer(values)

    if(payer_id == ""){
      Alert.alert("Invalid Name", 
      "Payer name is invalid. Please enter valid suitemate name",
      [{
        text: "Cancel",
        style: "cancel" 
      }])
      return 
    }

    var payees = ["IdIiDUvCu9bnb5QkdwmThJoAi863", "mJNOAnpK4ZTF5v9MeLSFa5nqCrH3"]

    // TO DO change payees back 
    //for (var payee_id in payees){
    payees.forEach((payee_id) => {
      if(payee_id == payer_id){
        Alert.alert("Invalid Payee", 
        "Payer cannot owe themselves money. Please remove payer from list.",
        [{
          text: "Cancel",
          style: "cancel"
        }])
        return 
        }
    })

    // TO DO change payees back 
    await paymentFunctions.addNewPayment({
      'title': values.title,
      'amount': values.amount,
      'payer': payer_id,
      'payees': payees,
      'details': values.details,
      'completed': false
    })
    navigation.goBack()
  }

  //const housemates = [{id: 'id1', name: 'Name 1'}, {id: 'id2', name: 'Name 2'}];    // placeholders for reading in the housemates of that suite
  //const initialhousemates = {'id1': false, 'id2': false};

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, [auth]);

  useEffect(() => {
    if (user) {
      getSuitemates(setSuitemates, user.suiteID);
      console.log("suitemates:", suitemates);
      let checkvalues = {};
      suitemates.forEach((mate) => {
        checkvalues[mate.id] = false;
      })
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
        {suitemates.map((mate) => {
          return (
            <Checkbox
              name="payees"
              specificName={mate.id}
              key={mate.id}
              checkedIcon='check-box'
              iconType='material'
              uncheckedIcon='check-box-outline-blank'
              title={mate.name}
            />
          );
        })}
        </View>
        </ScrollView>
        <SubmitButton title="Save Transaction" />
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
