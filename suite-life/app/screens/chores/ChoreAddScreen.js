import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from 'react-native';
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { db } from "../../components/firebase/firebase";

import defaultStyles from "../../config/styles";

export default function ChoreAddScreen() {
  const [choreName, setChoreName] = useState('')
  const [choreFrequency, setFrequencyName] = useState('')
  const [choreAssignee, setChoreAssignee] = useState('')
  // function to push data to firebase
  const addNewChore = () => {
    db.ref('/suites/test123/chores/').push({
      name: choreName, 
      frequency: choreFrequency,
      assignee: choreAssignee
    });
  }
  // sends data to firebase and clears the textbox values 
  const submitAndClear = () => {
    console.log("Submit Chore Tapped")
    addNewChore()
    setChoreName('')
    setFrequencyName('')
    setChoreAssignee('')
    
    // from main branch
    let chores_old = db.child(chores).getValue(String.class);
    let chores_new = chores_old.push(chore);

    db.collection("users").document(userId).update({
       chores: chores_new,
    });
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
