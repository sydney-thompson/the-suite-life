import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { TextInput } from 'react-native';
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { db } from "../../components/firebase/firebase";
import * as choreFunctions from "../../components/firebase/chores_and_payments";

import defaultStyles from "../../config/styles";

export default function ChoreAddScreen({navigation}) {
  const [choreName, setChoreName] = useState('')
  const [choreFrequency, setFrequencyName] = useState('')
  const [choreAssignee, setChoreAssignee] = useState('')

  // sends data to firebase and clears the textbox values 
  const submitAndClear = () => {
    // missing data 
    if(choreName == "" || choreAssignee == "" || choreFrequency == ""){
      Alert.alert(
        "Warning: Missing Data",
        "Please make sure all data fields have values.",
        [{ text: "OK"}]
      );
    }
    else{
      choreFunctions.addNewChore(choreName, choreFrequency, choreAssignee)
      setChoreName('')
      setFrequencyName('')
      setChoreAssignee('')
      navigation.goBack()
    }
  }
  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Add Chore</AppText>
      <TextInput style = {styles.input}
        placeholder = "Enter Chore Name"
        onChangeText = {(text) => setChoreName(text)}
        value={choreName}
        />
      <TextInput style = {styles.input}
        placeholder = "Enter Chore Frequency"
        onChangeText = {(text) => setFrequencyName(text)}
        value={choreFrequency}
        />
      <TextInput style = {styles.input}
        placeholder = "Enter Assigned Person"
        onChangeText = {(text) => setChoreAssignee(text)}
        value={choreAssignee}
        />
      <AppButton
        title="Submit Chore"
        color="primary"
        onPress={submitAndClear}
      ></AppButton>
      <AppButton
        title="Cancel"
        color="primary"
        onPress={() => navigation.goBack()}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
