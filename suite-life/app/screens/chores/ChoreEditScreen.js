import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from 'react-native';
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { db } from "../../components/firebase/firebase";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

export default function ChoreEditScreen(choreInfo) {
  const { choreID } = choreInfo.route.params.firebaseID;

  const [choreName, setChoreName] = useState('')
  const [choreFrequency, setFrequencyName] = useState('')
  const [choreAssignee, setChoreAssignee] = useState('')
  const [choreRefresher, setChoreRefresher] = useState('')

  // function to push data to firebase
  const updateChore = () => {
    db.ref(`/suites/test123/chores/${choreInfo.route.params.firebaseID}`).set({
      name: choreName, 
      frequency: choreFrequency,
      assignee: choreAssignee
    });
  }

  const loadChoreData = () => {
    if(choreRefresher != "True"){
      setChoreRefresher("True")
      db.ref(`/suites/test123/chores/${choreInfo.route.params.firebaseID}`).once('value', snapshot => {
        let data = snapshot.val()
        setChoreName(data.name)
        setFrequencyName(data.frequency)
        setChoreAssignee(data.assignee)
      });
    }
  }
  loadChoreData()

  // sends data to firebase and clears the textbox values 
  const submitAndClear = () => {
    const navigator = choreInfo.route.params.navigation;
    const update_promise = new Promise((resolve, reject) => {
      updateChore()
    })
    update_promise.then(
      setChoreRefresher("False"),
      navigator.goBack()
    )
  }
  // sends data to firebase and clears the textbox values 
  const deleteChore = () => {
    const navigator = choreInfo.route.params.navigation;
    let toDelete = db.ref(`/suites/test123/chores/${choreInfo.route.params.firebaseID}`)
    toDelete.remove()
    navigator.goBack()
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
