import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react/cjs/react.development";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import { googleLogout } from "../../components/auth/googleAuth";
import RegistrationContext from "../../components/auth/RegistrationContext";

import { auth } from "../../components/firebase/firebase";
import { getUserData } from "../../components/firebase/users";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

export default function AccountScreen({ navigation }) {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");

  useEffect(() => {
    getUserData(auth.currentUser.uid).then((userData) => {
      console.log(userData);
      console.log("name:", userData.name);
      setName(userData.name);
      setPronouns(userData.pronouns);
    });
  });

  return (
    <RegistrationContext.Consumer>
      {(setRegistered) => (
        <Screen style={styles.screen}>
          <View style={styles.headerContainer}>
            <AppTitle style={styles.title}>{name}</AppTitle>
            <View style={styles.loginContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate(routes.ACCOUNT_EDIT, {
                    name: name,
                    pronouns: pronouns,
                  });
                }}
              >
                <AppText style={styles.edit}>Edit</AppText>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <AppText style={styles.pronouns}>{pronouns}</AppText>
          <View style={styles.spacer} />
          <View style={styles.logoutContainer}>
            <AppButton
              style={styles.logout}
              title="Log Out"
              onPress={() => {
                googleLogout;
                setRegistered.setRegistered(false);
              }}
            />
          </View>
          <View style={styles.bottomSpacer} />
        </Screen>
      )}
    </RegistrationContext.Consumer>
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
