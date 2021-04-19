import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, ScrollView  } from "react-native";
import AppButton from "../../components/AppButton";
import ChoresButton from "../../components/ChoresButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import colors from "../../config/colors";

import { auth, db } from "../../components/firebase/firebase";
import * as choreFunctions from "../../components/firebase/chores";

import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

export default function ChoreScreen({ navigation }) {
  const [choreRefresh, setChoreRefresh] = useState('')
  const [choresJSON, setChoresJSON] = useState([])
  //var my_suiteID = choreFunctions.get_suiteID();

  // navigate to add screen
  const navigate_to_add = () => {
    setChoreRefresh("False")
    navigation.navigate(routes.CHORE_ADD, {navigation})
  }

  // navigate to edit screen
  const navigate_to_edit = (firebaseID) => {
    setChoreRefresh("False")
    navigation.navigate(routes.CHORE_EDIT, {navigation, firebaseID})
  }

  const renderChores = async() => {
   // var suiteID = get_suiteID()
    var suiteID = await choreFunctions.get_suiteID()
    await renderChores_helper(suiteID)
  }

  const renderChores_helper = async (suiteID) => {
    var choreJSON = [];
    await db.ref(`/suites/${suiteID}/chores`).once('value', snapshot => {
       let data = snapshot.val()
       if(data != "None"){
          let keys = Object.keys(data);
           // loop through firebase data and add data to choreJSON for use in rendering elements
           keys.forEach((key) => {
             choreJSON.push({name: data[key].name, firebaseID: key, frequency: data[key].frequency})
           });
           var holder = choresJSON
           if(JSON.stringify(holder) != JSON.stringify(choreJSON)){
             setChoresJSON(choreJSON)
           }
       }
     })
   }

  const refresh_screen = () => {
    choreJSON = choreFunctions.renderChoress()
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
      <View style={[styles.cardContainer, styles.headerContainer]}>
        <AppText style={styles.headerText}>Chores</AppText>
      </View>
      <ScrollView
        style={[styles.cardContainer, { flex: 1 }]}>
         {choresJSON.map((item)=>(
              <ChoresButton
                key= {item.firebaseID}
                color="tertiary"
                title={ item.name }
                assignees={"\nAssignees: " + item.assignees}
                frequency={"\nFrequency: " + item.frequency}
                details={"\Details: " + item.details}
                rightText={"Edit "}
                onPress={() => navigate_to_edit(item.firebaseID)}>
              </ChoresButton>
              )
         )}
     </ScrollView>
     <View style={styles.buttonContainer}>
       <AppButton
          title="Add Chore"
          color="primary"
          onPress={() => navigate_to_add()}
        ></AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 15,
    width: "95%",
    margin: "2%",
  },
  headerContainer: {
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: colors.secondary,
    flex: 0,
    height: "11%",
    justifyContent: "center",
  },
  headerText: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 50,
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: "95%",
  },
});
