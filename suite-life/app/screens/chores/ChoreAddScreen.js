import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { db } from '../components/Firebase/firebase';

import defaultStyles from "../../config/styles";

export default function ChoreAddScreen() {
  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>Add Chore</AppText>
      <AppButton
        title="Submit Chore"
        color="primary"
        onPress={() => {
          console.log("Submit Chore Tapped");

          let chores_old = db.child(chores).getValue(String.class);
          let chores_new = chores_old.push(chore);

          db.collection("users").document(userId).update({
            chores: chores_new
          });
        }}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
});
