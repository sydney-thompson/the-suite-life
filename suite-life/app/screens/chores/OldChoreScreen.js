import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { auth, db } from "../../components/firebase/firebase";
import * as choreFunctions from "../../components/firebase/chores";
import Swipeable from "react-native-gesture-handler/Swipeable";

import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import {
  disconnectFromChores,
  disconnectFromSuitemates,
  getSuitemates,
} from "../../components/firebase/suites";
import { getUserData } from "../../components/firebase/users";
import HorizontalSpaceSeparator from "../../components/HorizontalSpaceSeparator";
import colors from "../../config/colors";
import Chore from "../../components/Chore";
import AppTitle from "../../components/AppTitle";
import CompleteChoreAction from "../../components/CompleteChoreAction";

export default function ChoreScreen({ navigation }) {
  const [chores, setChores] = useState([]);
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, [auth]);

  useEffect(() => {
    if (user) {
      getSuitemates(setSuitemates, user.suiteID);
    } else {
      setSuitemates([]);
    }
    return () => {
      disconnectFromSuitemates();
    };
  }, [user, setSuitemates]);

  // navigate to add screen
  const navigate_to_add = () => {
    let initialAssignees = {};
    suitemates.forEach((item) => {
      initialAssignees[item.id] = false;
    });
    console.log("initialAssignees:", initialAssignees);
    navigation.navigate(routes.CHORE_ADD, { navigation, initialAssignees });
  };

  // navigate to edit screen
  const navigate_to_edit = (chore) => {
    navigation.navigate(routes.CHORE_EDIT, { navigation, chore });
  };

  function handleComplete(item) {
    choreFunctions.completeChore(item.id, user.suiteID).catch((err) => {
      console.error(error);
      Alert.alert("Something went wrong - please try again.");
    });
  }

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, [auth]);

  useEffect(() => {
    if (user) {
      choreFunctions.getSuiteChores(setChores, user.suiteID);
    } else {
      setChores([]);
    }

    return () => {
      disconnectFromChores();
    };
  }, [user, setChores]);

  return (
    <Screen style={styles.screen}>
      <View style={[styles.cardContainer, styles.headerContainer]}>
        <AppText style={styles.headerText}>Chores</AppText>
      </View>

      <View style={[styles.cardContainer, { flex: 1 }]}>
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
                <Swipeable
                  renderRightActions={() => (
                    <CompleteChoreAction onPress={() => handleComplete(item)} />
                  )}
                >
                  <TouchableOpacity onPress={() => navigate_to_edit(item)}>
                    <Chore
                      assignees={item.assignees}
                      day={item.day}
                      details={item.details}
                      name={item.name}
                      recurring={item.recurring}
                    />
                  </TouchableOpacity>
                </Swipeable>
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
