import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import TextInput2 from "../../components/TextInput2";
import Screen from "../../components/Screen";

import defaultStyles from "../../config/styles";

export default function PaymentAddScreen() {
  const AddTransaction = () => {
    // Placeholder: read values of TextInputs and handle data
    // navigate back to main payments screen
  }

  return (
    <Screen style={styles.screen}>
      <AppText style={defaultStyles.title}>New Transaction</AppText>
      <TextInput2 label="Title: " default_text="" ></TextInput2>
      <TextInput2 label="Amount: " default_text="$0.00" ></TextInput2>
      <AppButton
        title="Select suite members who owe >>>>>>>>"
        color="primary"
        onPress={() => console.log("Signal for pop-up selection menu")}
      ></AppButton>
      <View style={styles.container}>
      </View>
      <AppButton
        title="Save"
        color="secondary"
        onPress={() => AddTransaction()}
      ></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  container: {  // container for suite member icons
    backgroundColor: defaultStyles.colors.white,
    borderStyle: "solid",
    borderColor: defaultStyles.colors.black,
    borderWidth: 2,
    borderRadius: 25,
    flexDirection: "row",
    width: "90%",
    padding: 30,
    marginVertical: 1,
    alignItems: "center",
  },
});
