import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { TextInput } from 'react-native';
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { db } from "../../components/firebase/firebase";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import * as choreFunctions from "../../components/firebase/chores";

export default function ChoreEditScreen(choreInfo) {
  const { choreID } = choreInfo.route.params.firebaseID;

  const [choreName, setChoreName] = useState('')
  const [choreFrequency, setFrequencyName] = useState('')
  const [choreAssignee, setChoreAssignee] = useState('')
  const [choreRefresher, setChoreRefresher] = useState('')

  // navigates back to main screen
  const returnHome = () => {
    const navigator = choreInfo.route.params.navigation;
    navigator.goBack()
  }

  // gets chore data from firebase and populates text fields with it 
   const loadChoreData = () => {
      if(choreRefresher != "True"){
        setChoreRefresher("True")
        const choreData = choreFunctions.loadChoreData(choreInfo.route.params.firebaseID)
        setChoreName(choreData.name)
        setFrequencyName(choreData.frequency)
        setChoreAssignee(choreData.assignee)
      }
  }
  loadChoreData()

  // sends data to firebase and clears the textbox values 
  const submitAndClear = () => {
    if(choreName == "" || choreAssignee == "" || choreFrequency == ""){
      Alert.alert(
        "Warning: Missing Data",
        "Please make sure all data fields have values.",
        [{ text: "OK"}]
      );
    }
    else{
      const update_promise = new Promise((resolve, reject) => {
        choreFunctions.updateChore(choreName, choreFrequency, choreAssignee, choreInfo.route.params.firebaseID)
      })
      update_promise.then(
        setChoreRefresher("False"),
        returnHome()
      )
    }
  }

  // deletes chore from firebase then returns to main screen
  const deleteChore = () => {
    choreFunctions.deleteChore(choreInfo.route.params.firebaseID)
    returnHome()
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
