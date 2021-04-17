import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { auth, db } from "../../components/firebase/firebase";
import * as choreFunctions from "../../components/firebase/chores";

import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import { disconnectFromChores } from "../../components/firebase/suites";
import { getUserData } from "../../components/firebase/users";
import HorizontalSpaceSeparator from "../../components/HorizontalSpaceSeparator";
import colors from "../../config/colors";
import Chore from "../../components/Chore";
import AppTitle from "../../components/AppTitle";

export default function ChoreScreen({ navigation }) {
  const [choreRefresh, setChoreRefresh] = useState("");
  const [choresJSON, setChoresJSON] = useState([]);
  const [chores, setChores] = useState([]);
  const [vari, setVar] = useState([]);
  const [user, setUser] = useState(null);

  // navigate to add screen
  const navigate_to_add = () => {
    setChoreRefresh("False");
    navigation.navigate(routes.CHORE_ADD, { navigation });
  };

  // navigate to edit screen
  const navigate_to_edit = (chore) => {
    setChoreRefresh("False");
    navigation.navigate(routes.CHORE_EDIT, { navigation, chore });
  };

  // const renderChores = async () => {
  //   // var suiteID = get_suiteID()
  //   var suiteID = await choreFunctions.get_suiteID();
  //   await renderChores_helper(suiteID);
  //   //const ss =  await suiteFunctions.getSuitematess('74734846')
  //   /*
  //   const suitemateList = await suiteFunctions.getSuitematesList('74734846')
  //   var balancesJSON = []
  //   //balancesJSON.keys = suitemateList
  //   suitemateList.forEach((suitemate) => {
  //     var new_pair = {suitemate : 0}
  //     balancesJSON.push(new_pair)
  //   });
  //   balancesJSON.keys = suitemateList
  //   console.log("before")
  //   console.log(balancesJSON)
  //   console.log("after")*/
  // };

  // const renderChores_helper = async (suiteID) => {
  //   var choreJSON = [];
  //   await db.ref(`/suites/${suiteID}/chores`).once("value", (snapshot) => {
  //       if (snapshot.exists()) {
  //         snapshot.forEach((child) => {
  //           choresList.push

  //     let data = snapshot.val();
  //     if (data != "None") {

  //       let keys = Object.keys(data);
  //       // loop through firebase data and add data to choreJSON for use in rendering elements
  //       keys.forEach((key) => {
  //         choreJSON.push({
  //           name: data[key].name,
  //           firebaseID: key,
  //           frequency: data[key].frequency,
  //         });
  //       });
  //       var holder = choresJSON;
  //       if (JSON.stringify(holder) != JSON.stringify(choreJSON)) {
  //         setChoresJSON(choreJSON);
  //       }
  //     }
  //   });
  // };

  // const refresh_screen = () => {
  //   choreJSON = choreFunctions.renderChoress();
  //   const holder = choresJSON;
  //   if (JSON.stringify(holder) != JSON.stringify(choreJSON)) {
  //     setChoresJSON(choreJSON);
  //   }
  // };

  // {
  //   renderChores();
  // }

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, [auth]);

  useEffect(() => {
    if (user) {
      choreFunctions.getSuiteChores(setChores, user.suiteID);
      console.log("chores:", chores);
    } else {
      setChores([]);
    }

    return () => {
      disconnectFromChores();
    };
  }, [user, setChores]);

  // this causes a re render of the screen when you navigate back to it causing data to refresh
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     // The screen is focused
  //     renderChores();
  //   });
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <Screen style={styles.screen}>
      <View style={[styles.cardContainer, styles.headerContainer]}>
        <AppText style={styles.headerText}>Chores</AppText>
      </View>

      <View style={[styles.cardContainer, { flex: 1 }]}>
        <AppTitle style={styles.cardText}>{`Balances`}</AppTitle>
        {chores.length === 0 ? (
          <View style={styles.clearedContainer}>
            <AppText style={styles.clearedText}>{"All cleared!"}</AppText>
            <AppText style={styles.clearedText}>{"Good job!"}</AppText>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={chores}
              keyExtractor={(chore) => chore.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigate_to_edit(item)}>
                  <Chore
                    day={item.day}
                    details={item.details}
                    frequency={item.frequency}
                    name={item.title}
                  />
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={HorizontalSpaceSeparator}
            />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          title="Add chore +"
          color="secondary"
          onPress={() => navigate_to_add()}
        ></AppButton>
      </View>

      {/* <FlatList style={{ width: "100%" }}>
        {choresJSON.map((chore) => {
          console.log("chore:", chore);
          <AppButton
          key={chore.id}
          color="secondary"
          title={chore.name + "\n Frequency: " + chore.frequency}
          onPress={() => navigate_to_edit(chore)}
          ></AppButton>;
        })}
      </FlatList> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  clearedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  clearedText: {
    color: colors.light,
    fontSize: 25,
    fontWeight: "600",
  },
  listContainer: {
    width: "100%",
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
  cardText: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "600",
  },
  headerText: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 50,
  },

  topButtonContainer: {
    alignItems: "center",
    marginBottom: -5,
    width: "95%",
  },

  buttonContainer: {
    alignItems: "center",
    width: "95%",
  },
});
