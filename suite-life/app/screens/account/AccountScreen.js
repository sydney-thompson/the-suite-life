import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import AppButton from "../../components/AppButton";
import AppText from "../../components/text/AppText";
import AppTitle from "../../components/text/AppTitle";
import { googleLogout } from "../../components/auth/googleAuth";
import RegistrationContext from "../../components/auth/RegistrationContext";

import {
  disconnectFromUser,
  getFeedback,
  getUserDataConnection,
} from "../../components/firebase/users";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import routes from "../../navigation/routes";

import {
  TestChores,
  TestPayments,
  TestSuites,
  TestUsers,
} from "../../testing/unitTests";
import EditAccountModal from "../../components/EditAccountModal";

export default function AccountScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({ name: "", pronouns: "" });

  useEffect(() => {
    getUserDataConnection(setUser).catch((err) => {
      console.error("getUserDataConnection error:", err);
    });

    return () => {
      disconnectFromUser(user.uid);
    };
  }, [setUser]);

  async function runTests() {
    let suites_res = await TestSuites();
    let users_res = await TestUsers();
    return {
      suites_res: suites_res,
      users_res: users_res,
    };
  }

  return (
    <RegistrationContext.Consumer>
      {(setRegistered) => (
        <Screen style={styles.screen}>
          <EditAccountModal
            initialName={user.name}
            initialPronouns={user.pronouns}
            uid={user.uid}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

          {user && (
            <Image
              source={{
                uri: user.photoURL,
              }}
              style={styles.image}
              resizeMode={"contain"}
            />
          )}
          <View style={styles.editContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(true);
              }}
              //   navigation.navigate(routes.ACCOUNT_EDIT, {
              //     name: user.name,
              //     pronouns: user.pronouns,
              //   });
              // }}
            >
              <AppText style={styles.edit}>Edit</AppText>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.headerContainer}>
            <AppTitle style={styles.title}>{user ? user.name : ""}</AppTitle>
          </View>

          <AppText style={styles.pronouns}>{user ? user.pronouns : ""}</AppText>
          <View style={styles.spacer} />
          <View style={styles.topContainer}>
            <AppButton
              style={styles.logout}
              title="Submit Feedback"
              color="secondary"
              onPress={() => {
                getFeedback().then((res) => {
                  navigation.navigate(routes.TESTING_RES, { feedback: res });
                });
                /*runTests().then((res) => {
                  
                  
                  navigation.navigate(routes.TESTING_RES, {
                    //chores_res: res.chores_res,
                    //payments_res: res.payments_res,
                    suites_res: res.suites_res,
                    users_res: res.users_res,
                  }); 
                }); */
              }}
            />
          </View>
          <View style={styles.logoutContainer}>
            <AppButton
              style={styles.logout}
              title="Log Out"
              color="secondary"
              onPress={() => {
                googleLogout(setRegistered.setRegistered);
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
    position: "absolute",
    right: 20,
    top: 20,
    color: colors.primary,
    // justifyContent: "flex-end",
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
    marginTop: 10,
    marginBottom: 10,
  },
  logout: {
    alignSelf: "flex-end",
  },
  topContainer: {
    width: "95%",
    marginBottom: 10,
  },
  logoutContainer: {
    width: "95%",
  },
  editContainer: {
    position: "absolute",
    right: 20,
  },
  pronouns: {
    color: colors.secondary,
  },
  spacer: {
    flex: 1,
  },

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
