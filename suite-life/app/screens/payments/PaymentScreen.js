import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  Alert,
} from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/text/AppText";
import BalanceDisplay from "../../components/lists/BalanceDisplay";
import Screen from "../../components/Screen";
import AppTitle from "../../components/text/AppTitle";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import Swipeable from "react-native-gesture-handler/Swipeable";
import HorizontalSpaceSeparator from "../../components/lists/HorizontalSpaceSeparator";
import CompleteAction from "../../components/lists/CompleteAction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PaymentForm from "../../components/forms/PaymentForm";
import { auth } from "firebase";
import { getUserData } from "../../components/firebase/users";
import {
  disconnectFromSuitemates,
  getSuitemates,
} from "../../components/firebase/suites";
import { addNewPayment, getBalances } from "../../components/firebase/payments";
import AddPaymentModal from "../../components/AddPaymentModal";

export default function PaymentScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [suitemates, setSuitemates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialPayees, setInitialPayees] = useState({});
  const [balances, setbalances] = useState({});

  useEffect(() => {
    // Balances placeholder: populate by retrieving suite members and balances;
    // color depending on sign of balance value
    let mounted = true;
    if (mounted) {
      getBalances().then((val) => {
        setbalances(val);
      });
    }
    return () => (mounted = false);
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUserData().then((val) => {
        setUser(val);
      });
    }

    return () => (mounted = false);
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
      if (suitemates.length > 0 && suitemates[0].balances) {
        for (const [key, value] of Object.entries(suitemates[0].balances)) {
          initialPayees[key] = false;
          setInitialPayees(initialPayees);
        }
      }
    }

    return () => (mounted = false);
  }, [suitemates, setInitialPayees]);

  const handleBalance = (item) => {
    console.log("item:", item);
  };

  return (
    <Screen style={styles.screen}>
      <AddPaymentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        initialPayees={initialPayees}
      />

      <View style={[styles.cardContainer, styles.headerContainer]}>
        <AppText style={styles.headerText}>Transactions</AppText>
      </View>

      <View style={[defaultStyles.cardContainer, { flex: 1 }]}>
        <AppTitle style={styles.cardText}>{`Balances`}</AppTitle>
        <FlatList
          data={balances}
          keyExtractor={(balance) => balance.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.PAYMENT_HISTORY, item)}
            >
              <BalanceDisplay
                name={item.name}
                key={item.id}
                value={item.value}
              />
            </TouchableOpacity>
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
  deleteIconContainer: {
    position: "absolute",
    left: 10,
  },
});
