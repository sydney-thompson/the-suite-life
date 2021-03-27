import React, { useEffect, componentDidMount } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import RegistrationContext from "../../components/auth/RegistrationContext";
import { TextInput } from "react-native-gesture-handler";
import { getRules, updateRules } from "../../components/firebase/suites";

export default function HouseRulesScreen({ navigation }) {
  const [text, setText] = React.useState("");

  useEffect(() => {
    getRules().then((rules) => {
      console.log(rules);
      setText(rules);
    });
  });
  // }, []);      couldn't figure out editability with race conditions

  return (
    <RegistrationContext.Consumer>
        {(setRegistered) => (
            <Screen style={styles.screen}>
                <View style={styles.titleContainer}>
                  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <AppText style={styles.tagline}>House Rules</AppText>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    defaultValue={text}
                    style={styles.input}
                    editable={false}
                    onChangeText={text => setText(text)}
                    multiline={true}
                  />
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton
                    title="I Accept"
                    textStyle={styles.buttonText}
                    color="white"
                    
                    onPress={() => {
                      updateRules(text);
                      setRegistered.setRegistered(true);
                    }}
                    />
                </View>
            </Screen>
        )}
    </RegistrationContext.Consumer>
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
  },
  buttonText: {
    color: colors.black,
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    padding: 10,
    top: 200,
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
