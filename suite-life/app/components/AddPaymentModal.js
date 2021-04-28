import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppTitle from "./text/AppTitle";
import PaymentForm from "./forms/PaymentForm";
import Screen from "./Screen";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import { addNewPayment } from "./firebase/payments";
import { Alert } from "react-native";

export default function AddPaymentModal({
  modalVisible,
  setModalVisible,
  initialPayees,
}) {
  const addPayment = (values) => {
    const payerID = values.payer.id;
    if (values.payees[payerID]) {
      Alert.alert("You cannot add the payer to the assigned suitemates");
    } else {
      var payees = [];
      const suitemates = Object.keys(values.payees);
      suitemates.forEach((suitemate) => {
        if (values.payees[suitemate] == true) {
          payees.push(suitemate);
        }
      });

      addNewPayment({
        title: values.title,
        amount: values.amount,
        payer: values.payer.id,
        payees: payees,
        details: values.details,
        completed: false,
      })
        .then(() => {
          setModalVisible(false);
        })
        .catch((err) => {
          console.error(err);
          Alert.alert("Something went wrong, please try again.");
        });
    }
  };

  return (
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
            payees: initialPayees,
            details: "",
          }}
          onSubmit={(values) => {
            addPayment(values);
          }}
        />
      </Screen>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
