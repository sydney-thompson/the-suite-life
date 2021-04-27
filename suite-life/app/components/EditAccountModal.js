import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import AppTitle from "./text/AppTitle";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import Screen from "./Screen";

import { updateUserDetails } from "./firebase/users";
import UserDetailsForm from "./forms/UserDetailsForm";

export default function EditAccountModal({
  initialName,
  initialPronouns,
  modalVisible,
  setModalVisible,
  uid,
}) {
  const onSubmit = (values) => {
    updateUserDetails(uid, values.name, values.pronouns)
      .then(() => {
        setModalVisible(false);
      })
      .catch((err) => {
        console.log("err:", err);
      });
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
          <AppTitle style={defaultStyles.title}>Edit Account</AppTitle>
        </View>
        <UserDetailsForm
          initialValues={{ name: initialName, pronouns: initialPronouns }}
          onSubmit={onSubmit}
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
