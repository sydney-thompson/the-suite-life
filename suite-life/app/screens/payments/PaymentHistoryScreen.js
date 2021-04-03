import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, ScrollView  } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { auth, db } from "../../components/firebase/firebase";
import * as paymentFunctions from "../../components/firebase/payments";

import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

export default function PaymentHistoryScreen({ navigation }) {
  const [paymentsJSON, setPaymentsJSON] = useState('')
  var paymentJSON = [];

  // navigate to add screen 
  const navigate_to_add = () => {
    navigation.navigate(routes.PAYMENT_ADD, {navigation})
  }

  const renderPayments = async () => {
    var suiteID = await paymentFunctions.get_suiteID()
    await db.ref(`/suites/${suiteID}/payments`).once('value', snapshot => {
      let data1 = snapshot.val()
      if(data1 != "None"){
        // grab payment data from firebase 
        db.ref().child('suites').child(suiteID).child('payments').on('value', (snapshot)=>{
          let data = snapshot.val();
          let keys = Object.keys(data);
          // loop through firebase data and add data to paymentsJSON for use in rendering elements
          keys.forEach((key) => { 
            paymentJSON.push({title: data[key].title, firebaseID: key, amount: data[key].amount})
          });
          const holder = paymentsJSON
          if(JSON.stringify(holder) != JSON.stringify(paymentJSON)){
            setPaymentsJSON(paymentJSON)
          }
        });
      }
    })
  }

  {renderPayments()}

  // this causes a re render of the screen when you navigate back to it causing data to refresh
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      renderPayments()
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Transactions</AppText>
      <ScrollView
        style={{width: '100%'}}>
         {paymentsJSON.map((item)=>(
              <AppButton 
                key= {item.firebaseID}
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

