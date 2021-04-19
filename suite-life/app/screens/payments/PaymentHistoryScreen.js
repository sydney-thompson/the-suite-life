import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { auth, db } from "../../components/firebase/firebase";
import * as paymentFunctions from "../../components/firebase/payments";
import {
  disconnectFromTransactions,
  getUserTransactionsTogether,
} from "../../components/firebase/suites";
import { getUserData } from "../../components/firebase/users";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import AddPaymentModal from "../../components/AddPaymentModal";
import AppTitle from "../../components/AppTitle";
import Payment from "../../components/Payment";
import HorizontalSpaceSeparator from "../../components/HorizontalSpaceSeparator";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CompleteAction from "../../components/CompleteAction";
import colors from "../../config/colors";

export default function PaymentHistoryScreen({ route }) {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = route.params.navigation;
  const otheruid = route.params.id;

  const navigate_to_add = () => {
    navigation.navigate(routes.PAYMENT_ADD, { navigation });
  };

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, []);

  useEffect(() => {
    if (user) {
      getUserTransactionsTogether(
        setTransactions,
        user.suiteID,
        otheruid,
        user.uid
      );
    } else {
      setTransactions([]);
    }

    return () => {
      disconnectFromTransactions();
    };
  }, [user, setTransactions]);

  return (
    <Screen style={styles.screen}>
      <AddPaymentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        initialPayees={() => {
          let initialPayees = {};
          initialPayees[otheruid] = false;
          if (user) {
            initialPayees[user.uid] = false;
          }
          return initialPayees;
        }}
      />

      <View
        style={[
          defaultStyles.headerContainer,
          { backgroundColor: colors.white },
        ]}
      >
        <AppTitle
          style={[defaultStyles.headerText, { color: colors.secondary }]}
        >
          Transactions
        </AppTitle>
      </View>

      <View style={styles.container}>
        {transactions.length === 0 ? (
          <View style={defaultStyles.clearedContainer}>
            <AppText style={defaultStyles.clearedText}>
              {"No transaction history"}
            </AppText>
          </View>
        ) : (
          <View style={defaultStyles.listContainer}>
            <FlatList
              data={transactions}
              keyExtractor={(transaction) => transaction.id.toString()}
              renderItem={({ item }) => (
                <Swipeable
                  renderRightActions={() => (
                    <CompleteAction
                      onPress={() => console.log("completed:", item)}
                    />
                  )}
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.log("tapped:", item);
                    }}
                  >
                    <Payment
                      title={item.title}
                      details={item.details}
                      net_amount={item.net_amount}
                      color={item.color}
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
          title="Add transaction +"
          color="secondary"
          onPress={() => setModalVisible(true)}
        ></AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    width: "95%",
    marginBottom: 10,
  },
  container: {
    padding: 10,
    width: "100%",
    flex: 1,
  },
  screen: {
    alignItems: "center",
  },
});
