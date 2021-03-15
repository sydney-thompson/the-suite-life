import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View  } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import {db} from '../../../src/config';

import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

export default function ChoreScreen({ navigation }) {
  const [choreRefresh, setChoreRefresh] = useState('')
  var choreJSON = [];

  const renderChores = () => {
    // grab chore data from firebase 
    db.ref().child('suites').child('test123').child('chores').on('value', (snapshot)=>{
      let data = snapshot.val();
      let keys = Object.keys(data);
      // loop through firebase data and add data to choreJSON for use in rendering elements
      keys.forEach((key) => { 
        choreJSON.push({name: data[key].name, firebaseID: key, frequency: data[key].frequency})
       });
       // set choreRefresh to True when screen loads to trigger quick refresh and allow chore buttons to load
       if(choreRefresh != "True"){
        setChoreRefresh("True")
       }
       //console.log({choreJSON})
       //console.log({choreRefresh})
    });
  }

  const editChore = (choreID) => {
    console.log("Button Pressed. Chore ID is:")
    console.log({choreID})
    db.ref(`/suites/test123/chores/${choreID}`).once('value', snapshot => {
      let data = snapshot.val()
      console.log(data)
    });
    console.log("reached here")
  }

  {renderChores()}

  // this causes a re render of the screen when you navigate back to it causing data to refresh
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      renderChores()
      console.log("rendered")
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Chores</AppText>
      <View>
         {choreJSON.map((item)=>(
              <AppButton 
                key= {item.firebaseID}
                color="tertiary" 
                title={ item.name + "\n Frequency: " + item.frequency }
                onPress={() => navigation.navigate(routes.CHORE_EDIT, {choreID: item.firebaseID})}> 
              </AppButton>
              )
         )}
     </View>
     <AppButton
        title="Add Chore"
        color="primary"
        onPress={() => navigation.navigate(routes.CHORE_ADD)}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
