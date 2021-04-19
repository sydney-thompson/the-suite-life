import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, ScrollView  } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { auth, db } from "../../components/firebase/firebase";
import * as paymentFunctions from "../../components/firebase/payments";
import { disconnectFromTransactions, getUserTransactionsTogether} from  "../../components/firebase/suites";
import { getUserData } from "../../components/firebase/users";

import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

export default function PaymentHistoryScreen({route}) {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigation = route.params.navigation
  const otheruid =route.params.id

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
      getUserTransactionsTogether(setTransactions, user.suiteID, otheruid, user.uid)
    } else {
      setTransactions([]);
    }

    return () => {
      disconnectFromTransactions();
    };
  }, [user, setTransactions]);

  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Transactions</AppText>
      <ScrollView
        style={{width: '100%'}}>
         {transactions.map((item)=>(
              <AppButton 
                key= {item.id}
                color="tertiary" 
                title={ item.title + "\n Amount: " + item.amount }
              > 
              </AppButton>
              )
         )}
     </ScrollView>
     <AppButton
        title="Add Transaction"
        color="primary"
        onPress={() => navigate_to_add()}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});

