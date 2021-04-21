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
import AppButton from "../../components/AppButton";
import ChoresButton from "../../components/ChoresButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import colors from "../../config/colors";

import { auth, db } from "../../components/firebase/firebase";
import * as choreFunctions from "../../components/firebase/chores";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import {
  disconnectFromChores,
  disconnectFromSuitemates,
  getSuitemates,
} from "../../components/firebase/suites";
import { getUserData } from "../../components/firebase/users";
import HorizontalSpaceSeparator from "../../components/HorizontalSpaceSeparator";
import Chore from "../../components/Chore";
import AppTitle from "../../components/AppTitle";
import CompleteAction from "../../components/CompleteAction";
import ChoreForm from "../../components/forms/ChoreForm";
import { add } from "react-native-reanimated";
import daysOfWeek from "../../config/daysOfWeek";

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
              if (initialValues && !(initialValues.id == "")) {
                submitEdits(values);
              } else {
                addChore(values);
              }
            }}
          />
        </Screen>
      </Modal>

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
    fontSize: 40,
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

  modalHeaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  deleteIconContainer: {
    position: "absolute",
    left: 10,
  },
  modal: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 0,
  },
});
