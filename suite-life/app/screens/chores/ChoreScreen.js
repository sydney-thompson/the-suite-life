import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, ScrollView  } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { auth, db } from "../../components/firebase/firebase";
import * as choreFunctions from "../../components/firebase/chores";

import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

export default function ChoreScreen({ navigation }) {
  const [choreRefresh, setChoreRefresh] = useState('')
  const [choresJSON, setChoresJSON] = useState('')
  var choreJSON = [];
  //var lastJSON = [];

  // navigate to add screen 
  const navigate_to_add = () => {
    setChoreRefresh("False")
    navigation.navigate(routes.CHORE_ADD, {navigation})
  }

  // navigate to edit screen 
  const navigate_to_edit = (firebaseID) => {
    setChoreRefresh("False")
    //console.log(choreRefresh)
    navigation.navigate(routes.CHORE_EDIT, {navigation, firebaseID})
  }

  const renderChores = () => {
    db.ref(`/suites/test123/chores`).once('value', snapshot => {
      let data1 = snapshot.val()
      if(data1 != "None"){
        // grab chore data from firebase 
        db.ref().child('suites').child('test123').child('chores').on('value', (snapshot)=>{
          let data = snapshot.val();
          let keys = Object.keys(data);
          // loop through firebase data and add data to choreJSON for use in rendering elements
          keys.forEach((key) => { 
            choreJSON.push({name: data[key].name, firebaseID: key, frequency: data[key].frequency})
          });
          const holder = choresJSON
          if(JSON.stringify(holder) != JSON.stringify(choreJSON)){
            setChoresJSON(choreJSON)
          }
        });
      }
    })
  }

  const refresh_screen = () => {
    choreJSON = choreFunctions.renderChoress()
   // if(choreRefresh != "True"){
   //     setChoreRefresh("True")
   //   }
    const holder = choresJSON
    if(JSON.stringify(holder) != JSON.stringify(choreJSON)){
        setChoresJSON(choreJSON)
      }
  }

  {renderChores()}

  // this causes a re render of the screen when you navigate back to it causing data to refresh
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      renderChores()
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Chores</AppText>
      <ScrollView
        style={{width: '100%'}}>
         {choreJSON.map((item)=>(
              <AppButton 
                key= {item.firebaseID}
                color="tertiary" 
                title={ item.name + "\n Frequency: " + item.frequency }
                onPress={() => navigate_to_edit(item.firebaseID)}> 
              </AppButton>
              )
         )}
     </ScrollView>
     <AppButton
        title="Add Chore"
        color="primary"
        onPress={() => navigate_to_add()}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
