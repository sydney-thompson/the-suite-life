import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from 'react-native';
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { db } from "../../components/firebase/firebase";
import defaultStyles from "../../config/styles";

export default function ChoreEditScreen(choreInfo) {
  const { choreID } = choreInfo.route.params;
  console.log("chore ID:" + choreID)

  const [choreName, setChoreName] = useState('')
  const [choreFrequency, setFrequencyName] = useState('')
  const [choreAssignee, setChoreAssignee] = useState('')
  const [choreRefresher, setChoreRefresher] = useState('')

  // function to push data to firebase
  const updateChore = () => {
    db.ref(`/suites/test123/chores/${choreID}`).set({
      name: choreName, 
      frequency: choreFrequency,
      assignee: choreAssignee
    });
  }

  const loadChoreData = (choreID) => {
    if(choreRefresher != "True"){
      setChoreRefresher("True")
      console.log("Button Pressed. Chore ID is:")
      console.log({choreID})
      db.ref(`/suites/test123/chores/${choreID}`).once('value', snapshot => {
        let data = snapshot.val()
        setChoreName(data.name)
        setFrequencyName(data.frequency)
        setChoreAssignee(data.assignee)
        console.log(data)
      });
    }
    console.log("reached here")
  }
  loadChoreData(choreID)

  // sends data to firebase and clears the textbox values 
  const submitAndClear = () => {
    console.log("Submit Chore Tapped")
    updateChore()
    setChoreRefresher("False")
  }
  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Edit Chore</AppText>
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
