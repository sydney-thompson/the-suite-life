import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import navigation from "../navigation/RulesNavigator";
import routes from "../navigation/routes";

import Screen from "../components/Screen";
import defaultStyles from "../config/styles";

export default function SuiteAccountScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <AppText style={defaultStyles.title}>Suitemates</AppText>
        <View style={styles.suitematesContainer}>
          <AppText>Suitemate 1</AppText>
          <AppText>Suitemate 2</AppText>
          <AppText>Suitemate 3</AppText>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
        title="View Rules"
        color="primary"
        
        onPress={() => {
          navigation.navigate(routes.RULES, {navigation})
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
  container: {
    paddingTop: 25,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "cover",
  },
  suitematesContainer: {},
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    width: "100%",
   },
});
