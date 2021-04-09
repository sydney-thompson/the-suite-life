import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { googleLogout } from "../../components/auth/googleAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../../components/forms";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import { auth } from "../../components/firebase/firebase";
import { updateUserDetails } from "../../components/firebase/users";
import { TextInput } from "react-native-gesture-handler";
import AppButton from "../../components/AppButton";



export default function TestingResScreen({ route, navigation }) {

    const[testing_res, set_testing] = useState("");
    
    useEffect(() => {
        if (route.params.chores_res == true && route.params.payments_res == true && route.params.suites_res == true && route.params.users_res == true) {
            set_testing("Testing chores.js ************************************************************\nTests to run: addNewChore(), loadChoreData(), updateChore(), deleteChore()...Failure will halt execution flow\nCHORES/addNewChores: PASSED\nCHORES/loadChoreData: PASSED\nCHORES/updateChore: PASSED\nCHORES/deleteChore: PASSED\nTESTS COMPLETE\nTesting payments.js ************************************************************\nTests to run: addNewPayment(), loadPaymentData(), updatePayment(), deletePayment()...Failure will halt execution flow\nPAYMENTS/addNewPayment: PASSED\nPAYMENTS/loadPaymentData: PASSED\nPAYMENT/updatePayment: PASSED\nPAYMENTS/deletePayment: PASSED\nTESTS COMPLETE\nTesting suites.js ************************************************************\nTests to run: createSuite(), checkSuiteExists(), addUserToSuite(), getRules(), deleteSuite()...Failure will halt execution flow\nSUITES/createSuite: PASSED\nSUITES/checkSuiteExists: PASSED\nSUITES/addUserToSuite: PASSED\nSUITES/getRules: PASSED\nSUITES/deleteSuite: PASSED\nTESTS COMPLETE\nTesting users.js *************************************************************\nTests to run: createUser(), checkUserExists(), updateUserSuite(), updateUserDetails(), getUserData(), deleteUser()...Failure will halt execution flow\nUSERS/createUser: PASSED\nUSERS/checkUserExists: PASSED\nUSERS/updateUserSuite: PASSED\nUSERS/updateUserDetails: PASSED\nUSERS/getUserData: PASSED\nUSERS/deleteUser: PASSED\nTESTS COMPLETE")
        }
    });

    
    return (
        <Screen style={styles.screen}>
            <View style={styles.headerContainer}>
            <AppTitle style={styles.title}>{"Results"}</AppTitle>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                defaultValue={testing_res}
                style={styles.input}
                editable={false}
                onChangeText={testing_res => set_testing(testing_res)}
                multiline={true}
                />
            </View>
            <View style={styles.buttonContainer}>
                <AppButton
                title="OK"
                textStyle={styles.buttonText}
                color="white"
                
                onPress={() => {
                    navigation.goBack()
                }}
                />
            </View>


            

        </Screen>
      );
    }
    
    const styles = StyleSheet.create({
      screen: {
        alignItems: "center",
      },
      bottomSpacer: {
        height: 20,
      },
      container: {
        paddingTop: 25,
        alignItems: "center",
      },
      edit: {
        color: colors.primary,
        justifyContent: "flex-end",
      },
      headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      },
      image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        resizeMode: "cover",
      },
      logout: {
        alignSelf: "flex-end",
      },
      logoutContainer: {
        width: "95%",
      },
      loginContainer: {
        position: "absolute",
        right: 20,
      },
      pronouns: {
        color: colors.secondary,
      },
      spacer: {
        flex: 1,
      },
    });