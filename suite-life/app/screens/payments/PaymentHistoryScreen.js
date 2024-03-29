import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppButton from "../../components/AppButton";
import AppText from "../../components/text/AppText";
import Screen from "../../components/Screen";
import * as paymentFunctions from "../../components/firebase/payments";
import {
  disconnectFromPayments,
  getUserTransactionsTogether,
} from "../../components/firebase/suites";
import { getUserDataConnection } from "../../components/firebase/users";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import AddPaymentModal from "../../components/AddPaymentModal";
import AppTitle from "../../components/text/AppTitle";
import Payment from "../../components/lists/Payment";
import HorizontalSpaceSeparator from "../../components/lists/HorizontalSpaceSeparator";
import CompleteAction from "../../components/lists/CompleteAction";
import colors from "../../config/colors";

export default function PaymentHistoryScreen({ route }) {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("No outstanding payments");

  const navigation = route.params.navigation;
  const otheruid = route.params.id;

  const navigate_to_add = () => {
    navigation.navigate(routes.PAYMENT_ADD, { navigation });
  };

  useEffect(() => {
    getUserDataConnection(setUser).catch((err) => {
      console.error("getUserDataConnection error:", err);
    });
  }, [setUser]);

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
      disconnectFromPayments();
    };
  }, [user, setTransactions]);

  useEffect(() => {
    if (user) {
      if (user.balances[route.params.id] < 0) {
        setTitle(
          `You owe ${route.params.name} $${user.balances[route.params.id] * -1}`
        );
      } else if (user.balances[route.params.id] > 0) {
        setTitle(
          `${route.params.name} owes you $${user.balances[route.params.id]}`
        );
      } else {
        setTitle("No outstanding payments");
      }
    }
  }, [user, setTitle]);

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
          style={[
            defaultStyles.headerText,
            { color: colors.secondary, fontSize: 30 },
          ]}
          numberofLines={2}
        >
          {title}
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
                    <View style={{ flexDirection: "row" }}>
                      <CompleteAction
                        iconName="scale-balance"
                        onPress={() => {
                          paymentFunctions.handleBalance(
                            route.params.name,
                            `Balance ${item.name}`,
                            user.suiteID,
                            [item]
                          );
                        }}
                      />
                      <CompleteAction
                        color="danger"
                        iconName="delete"
                        onPress={() => {
                          Alert.alert(
                            "Delete",
                            `Are you sure you want to delete this transaction?`,
                            [
                              {
                                text: "Continue",
                                onPress: () => {
                                  paymentFunctions.deletePayment(
                                    user.suiteID,
                                    item
                                  );
                                },
                              },
                              {
                                text: "Cancel",
                              },
                            ]
                          );
                        }}
                      />
                    </View>
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
                      completed={item.completed}
                    />
                  </TouchableOpacity>
                </Swipeable>
              )}
              ItemSeparatorComponent={HorizontalSpaceSeparator}
            />
          </View>
        )}
      </View>
      {transactions.length > 0 && (
        <View style={styles.buttonContainer}>
          <AppButton
            title="Balance Transactions"
            color="primary"
            onPress={() =>
              paymentFunctions.handleBalance(
                route.params.name,
                `Balance All Transactions`,
                user.suiteID,
                transactions
              )
            }
          ></AppButton>
        </View>
      )}

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
