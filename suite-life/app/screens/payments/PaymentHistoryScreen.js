import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, ScrollView  } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import HistoryItem from "../../components/HistoryItem";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";


import { auth, db } from "../../components/firebase/firebase";
import * as paymentFunctions from "../../components/firebase/payments";
import { disconnectFromTransactions, getUserTransactions} from  "../../components/firebase/suites";
import { getUserData } from "../../components/firebase/users";

import routes from "../../navigation/routes";

export default function PaymentHistoryScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const navigate_to_add = () => {
    navigation.navigate(routes.PAYMENT_ADD, {navigation})
  }

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, []);

  useEffect(() => {
    if (user) {
      getUserTransactions(setTransactions, user.suiteID, user.uid);
    } else {
      setTransactions([]);
    }

    return () => {
      disconnectFromTransactions();
    };
  }, [user, setTransactions]);

  return (
    <Screen style={styles.screen}>
      <View style={[styles.cardContainer, styles.headerContainer]}>
        <AppText style={styles.headerText}>Past Transactions</AppText>
      </View>

      <View style={[styles.cardContainer, { flex: 1 }]}>
      <ScrollView
        style={{width: '100%'}}>
         {transactions.map((item)=>(
              <HistoryItem
                key= {item.id}
                color="tertiary"
                title={ item.title + "\nAmount: " + item.amount }
              >
              </HistoryItem>
              )
         )}
     </ScrollView>
     </View>

     <View style={styles.buttonContainer}>
       <AppButton
          title="Add Transaction"
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
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: "95%",
  },
});
