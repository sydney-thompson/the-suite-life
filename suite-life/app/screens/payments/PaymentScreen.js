import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
} from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import BalanceDisplay from "../../components/BalanceDisplay";
import Screen from "../../components/Screen";
import AppTitle from "../../components/AppTitle";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import Swipeable from "react-native-gesture-handler/Swipeable";
import HorizontalSpaceSeparator from "../../components/HorizontalSpaceSeparator";
import CompleteChoreAction from "../../components/CompleteChoreAction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PaymentForm from "../../components/forms/PaymentForm";
import { auth } from "firebase";
import { getUserData } from "../../components/firebase/users";
import {
  disconnectFromSuitemates,
  getSuitemates,
} from "../../components/firebase/suites";

export default function PaymentScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialPayees, setInitialPayees] = useState({});

  const hardInitialPayees = {
    "3W6ZDlPdDhWmPxvPGVBSa9U3A4l2": false,
    "8lh1VeoQrtb3gAWFEDt7Dfbwvzd2": false,
    IdIiDUvCu9bnb5QkdwmThJoAi863: false,
    SbyVXqeCisX8IvEnZosxFHytqw53: false,
    b3q3PcKIfdgUapdHbkCLgsUtWQ83: false,
    mJNOAnpK4ZTF5v9MeLSFa5nqCrH3: false,
    oiZtBtU47TW3C6UA7tFq5KV5UW12: false,
    yjGDsdtY9jNjjpyMaEWHFFzhQa43: false,
    z0Ax8ZANZdSZNFdr3o7TeDdDAal2: false,
  };

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

  useEffect(() => {
    console.log("suitemates:", suitemates.length);
    console.log("suitemates[0]:", suitemates[0]);
    if (suitemates.length > 0) {
      for (const [key, value] of Object.entries(suitemates[0].balances)) {
        initialPayees[key] = false;
        setInitialPayees(initialPayees);
      }
      console.log("initial payees:", initialPayees);
    }
  }, [suitemates, setInitialPayees]);

  // Balances placeholder: populate by retrieving suite members and balances;
  // color depending on sign of balance value
  const balances = [
    {
      name: "Suitemate 1",
      id: 123,
      value: 15,
    },
    {
      name: "Suitemate 2",
      id: 456,
      value: -60,
    },
  ];
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
            <AppTitle style={defaultStyles.title}>New Payment</AppTitle>
          </View>
          <PaymentForm
            initialValues={{
              title: "",
              amount: "",
              payer: "",
              payees: hardInitialPayees,
              details: "",
            }}
            onSubmit={(values) => console.log("values:", values)}
          />
        </Screen>
      </Modal>

      <View style={[styles.cardContainer, styles.headerContainer]}>
        <AppText style={styles.headerText}>Transactions</AppText>
      </View>

      <View style={[styles.cardContainer, { flex: 1 }]}>
        <AppTitle style={styles.cardText}>{`Balances`}</AppTitle>
        <FlatList
          data={balances}
          keyExtractor={(balance) => balance.id.toString()}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() => (
                <CompleteChoreAction onPress={() => handleComplete(item)} />
              )}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.PAYMENT_HISTORY)}
              >
                <BalanceDisplay
                  name={item.name}
                  key={item.id}
                  value={item.value}
                />
              </TouchableOpacity>
            </Swipeable>
          )}
          ItemSeparatorComponent={HorizontalSpaceSeparator}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Add transaction +"
          color="secondary"
          onPress={() => setModalVisible(true)}
          // onPress={() => navigation.navigate(routes.PAYMENT_ADD)}
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
