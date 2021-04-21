import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";

import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import { updateUserDetails } from "../../components/firebase/users";
import { TextInput } from "react-native-gesture-handler";
import AppButton from "../../components/AppButton";


export default function TestingResScreen({ route, navigation }) {
  const [text, setText] = React.useState("");
  const [editable, seteditable] = React.useState("");
  //console.log(route.params.rules);

  return (
    <Screen style={styles.screen}>
      <View style={styles.titleContainer}>
        <TouchableWithoutFeedback
          onPress={() =>
            updateRules(text).then(() => {
              Keyboard.dismiss();
            })
          }
        >
          <AppText style={styles.tagline}>Feedback Form</AppText>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          defaultValue={"Please type comments or feedback here!"}
          style={styles.input}
          editable={true}
          onChangeText={(text) => setText(text)}
          multiline={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Submit"
          textStyle={styles.buttonText}
          color="white"
          onPress={() => {
            //navigation.navigate(routes.SUITE, { navigation });
            navigation.goBack()
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    width: "100%",
    bottom: -20,
  },
  buttonText: {
    color: colors.black,
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    padding: 10,
    top: 250,
  },
  input: {
    height: 425,
    width: 300,
    paddingTop: 30,
    paddingBottom: 0,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 25,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "stretch",
    backgroundColor: "#FFFFF0",
  },
  tagline: {
    color: colors.black,
    fontSize: 50,
    fontWeight: "bold",
    lineHeight: 25,
    paddingLeft: 40,
    paddingTop: 75,
  },
  textTitle: {
    color: colors.black,
    fontSize: 18,
    lineHeight: 15,
    paddingLeft: 30,
  },
  titleContainer: {
    alignItems: "flex-start",
    position: "absolute",
    top: 0,
  },
});





/*export default function TestingResScreen({ route, navigation }) {

    const[testing_res, set_testing] = useState("");
    
    //useEffect(() => {
    //    if (route.params.chores_res == true && route.params.payments_res == true && route.params.suites_res == true && route.params.users_res == true) {
    //        set_testing("Testing chores.js ****************************************\nTests to run: addNewChore(), loadChoreData(), updateChore(), deleteChore()...Failure will halt execution flow\nCHORES/addNewChores: PASSED\nCHORES/loadChoreData: PASSED\nCHORES/updateChore: PASSED\nCHORES/deleteChore: PASSED\nTESTS COMPLETE\nTesting payments.js *************************************\nTests to run: addNewPayment(), loadPaymentData(), updatePayment(), deletePayment()...Failure will halt execution flow\nPAYMENTS/addNewPayment: PASSED\nPAYMENTS/loadPaymentData: PASSED\nPAYMENT/updatePayment: PASSED\nPAYMENTS/deletePayment: PASSED\nTESTS COMPLETE\nTesting suites.js *****************************************\nTests to run: createSuite(), checkSuiteExists(), addUserToSuite(), getRules(), deleteSuite()...Failure will halt execution flow\nSUITES/createSuite: PASSED\nSUITES/checkSuiteExists: PASSED\nSUITES/addUserToSuite: PASSED\nSUITES/getRules: PASSED\nSUITES/deleteSuite: PASSED\nTESTS COMPLETE\nTesting users.js *****************************************\nTests to run: createUser(), checkUserExists(), updateUserSuite(), updateUserDetails(), getUserData(), deleteUser()...Failure will halt execution flow\nUSERS/createUser: PASSED\nUSERS/checkUserExists: PASSED\nUSERS/updateUserSuite: PASSED\nUSERS/updateUserDetails: PASSED\nUSERS/getUserData: PASSED\nUSERS/deleteUser: PASSED\nTESTS COMPLETE")
    //    }
    //}); 
    useEffect(() => {
        if (route.params.suites_res == true && route.params.users_res == true) {
            set_testing("Testing suites.js *****************************************\nTests to run: createSuite(), checkSuiteExists(), addUserToSuite(), getRules(), deleteSuite()...Failure will halt execution flow\nSUITES/createSuite: PASSED\nSUITES/checkSuiteExists: PASSED\nSUITES/addUserToSuite: PASSED\nSUITES/getRules: PASSED\nSUITES/deleteSuite: PASSED\nTESTS COMPLETE\nTesting users.js *****************************************\nTests to run: createUser(), checkUserExists(), updateUserSuite(), updateUserDetails(), getUserData(), deleteUser()...Failure will halt execution flow\nUSERS/createUser: PASSED\nUSERS/checkUserExists: PASSED\nUSERS/updateUserSuite: PASSED\nUSERS/updateUserDetails: PASSED\nUSERS/getUserData: PASSED\nUSERS/deleteUser: PASSED\nTESTS COMPLETE")
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
    }); */