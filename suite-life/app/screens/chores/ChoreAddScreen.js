import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from 'react-native';
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { db } from "../../components/firebase/firebase";

import defaultStyles from "../../config/styles";

export default function ChoreAddScreen({navigation}) {
  const [choreName, setChoreName] = useState('')
  const [choreFrequency, setFrequencyName] = useState('')
  const [choreAssignee, setChoreAssignee] = useState('')
  // function to push data to firebase
  const addNewChore = () => {
    db.ref(`/suites/test123/chores`).once('value', snapshot => {
      let data = snapshot.val()
      if(data == "None"){
        db.ref('/suites/test123/chores/').set({
          name: choreName, 
          frequency: choreFrequency,
          assignee: choreAssignee
        });
      }
      else{
        db.ref('/suites/test123/chores/').push({
          name: choreName, 
          frequency: choreFrequency,
          assignee: choreAssignee
        });
      }
    });
  //  let choresValue = db.ref(`/suites/test456/chores/`)
  //  console.log(choresValue)
  }
  // sends data to firebase and clears the textbox values 
  const submitAndClear = () => {
    addNewChore()
    setChoreName('')
    setFrequencyName('')
    setChoreAssignee('')
    navigation.goBack()
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
