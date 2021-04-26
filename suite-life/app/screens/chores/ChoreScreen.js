import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Modal,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "../../components/AppButton";
import AppText from "../../components/text/AppText";
import AppTitle from "../../components/text/AppTitle";
import colors from "../../config/colors";
import Chore from "../../components/lists/Chore";
import ChoreForm from "../../components/forms/ChoreForm";
import CompleteAction from "../../components/lists/CompleteAction";
import daysOfWeek from "../../config/daysOfWeek";
import defaultStyles from "../../config/styles";
import HorizontalSpaceSeparator from "../../components/lists/HorizontalSpaceSeparator";
import Screen from "../../components/Screen";
import { auth } from "../../components/firebase/firebase";
import * as choreFunctions from "../../components/firebase/chores";
import {
  disconnectFromChores,
  disconnectFromSuitemates,
  getSuitemates,
} from "../../components/firebase/suites";
import { getUserData } from "../../components/firebase/users";

export default function ChoreScreen({ navigation }) {
  const [chores, setChores] = useState([]);
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialAssignees, setInitialAssignees] = useState({});
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUserData().then((val) => {
        setUser(val);
      });
    }
    return () => {
      mounted = false;
    };
  }, [auth]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (user) {
        getSuitemates(setSuitemates, user.suiteID);
      } else {
        setSuitemates([]);
      }
    }
    return () => {
      mounted = false;
      disconnectFromSuitemates();
    };
  }, [user, setSuitemates]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      suitemates.forEach((item) => {
        initialAssignees[item.id] = false;
        setInitialAssignees(initialAssignees);
      });
    }
    return () => {
      mounted = false;
    };
  }, [suitemates, setInitialAssignees]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (user) {
        choreFunctions.getSuiteChores(setChores, user.suiteID);
      } else {
        setChores([]);
      }
    }

    return () => {
      mounted = false;
      disconnectFromChores();
    };
  }, [user, setChores]);

  function handleComplete(item) {
    choreFunctions.completeChore(item.id, user.suiteID).catch((err) => {
      console.error(error);
      Alert.alert("Something went wrong - please try again.");
    });
  }

  function addChore(values) {
    console.log("adding");
    // Send values to firebase and navigate back
    choreFunctions.addNewChore(values);
    setModalVisible(!modalVisible);
  }

  function submitEdits(values) {
    if (user) {
      console.log("values:", values);
      choreFunctions
        .updateChore(values, values.id, user.suiteID)
        .then(() => {
          setModalVisible(!modalVisible);
        })
        .catch((err) => {
          console.error("HERE:", err);
          Alert.alert("Something went wrong. Try again.");
        });
    } else {
      Alert.alert("Something went wrong. Try again.");
    }
  }

  return (
    <Screen style={styles.screen}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Screen style={styles.modal}>
          <View style={styles.modalHeaderContainer}>
            <View style={styles.deleteIconContainer}>
              <TouchableWithoutFeedback
                onPress={() => setModalVisible(!modalVisible)}
              >
                <MaterialCommunityIcons
                  name="close"
                  color={colors.medium}
                  size={30}
                />
              </TouchableWithoutFeedback>
            </View>
            <AppTitle style={defaultStyles.title}>New Chore</AppTitle>
          </View>
          <ChoreForm
            initialValues={initialValues}
            onSubmit={(values) => {
              if (initialValues && initialValues.id != null) {
                submitEdits(values);
              } else {
                addChore(values);
              }
            }}
          />
        </Screen>
      </Modal>

      <View
        style={[defaultStyles.cardContainer, defaultStyles.headerContainer]}
      >
        <AppText style={defaultStyles.headerText}>Chores</AppText>
      </View>

      <View style={[defaultStyles.cardContainer, { flex: 1 }]}>
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
                    <CompleteAction onPress={() => handleComplete(item)} />
                  )}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setInitialValues({
                        ...item,
                        day: daysOfWeek.filter((day) => {
                          return day.label === item.day;
                        })[0],
                      });
                      setModalVisible(true);
                    }}
                  >
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
          onPress={() => {
            setInitialValues({
              details: "",
              name: "",
              assignees: initialAssignees,
              recurring: false,
              day: null,
            });
            setModalVisible(true);
          }}
          // onPress={() => navigate_to_add()}
        ></AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    width: "95%",
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
  deleteIconContainer: {
    position: "absolute",
    left: 10,
  },
  listContainer: {
    width: "100%",
  },
  modalHeaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modal: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 0,
  },
  topButtonContainer: {
    alignItems: "center",
    marginBottom: -5,
    width: "95%",
  },
});
