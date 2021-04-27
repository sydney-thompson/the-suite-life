import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";

import colors from "../../config/colors";
import AppText from "../text/AppText";
import { auth } from "../firebase/firebase";
import { disconnectFromSuitemates, getSuitemates } from "../firebase/suites";
import { getUserData } from "../firebase/users";
import HorizontalSpaceSeparator from "./HorizontalSpaceSeparator";

export default function Chore({
  assignees,
  day,
  details,
  name,
  recurring,
  style = null,
  textStyle = null,
}) {
  const [suitemates, setSuitemates] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, [auth]);

  useEffect(() => {
    if (user) {
      getSuitemates(setSuitemates, user.suiteID, null, assignees);
    } else {
      setSuitemates([]);
    }
    return () => {
      disconnectFromSuitemates();
    };
  }, [user, assignees, setSuitemates]);

  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.title} numberOfLines={1}>
        {name}
      </AppText>
      <View style={styles.listContainer}>
        <FlatList
          data={suitemates}
          keyExtractor={(suitemate) => suitemate.id.toString()}
          numColumns={8}
          renderItem={({ item }) => (
            <Image
              source={{
                uri: item.photoURL,
              }}
              style={styles.iconImage}
              resizeMode={"contain"}
            />
          )}
          ItemSeparatorComponent={HorizontalSpaceSeparator}
        />
      </View>
      <AppText style={styles.text}>
        {recurring ? `Every ${day}` : `${day}`}
      </AppText>
      <AppText
        style={styles.detailsText}
        numberOfLines={2}
      >{`${details}`}</AppText>
      <AppText style={styles.rightText}>{"Edit"}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10,
    width: "100%",
  },
  icon: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.secondary,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginRight: 5,
    width: 40,
  },
  iconImage: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginRight: 5,
    width: 40,
  },
  iconText: {
    color: colors.white,
    fontWeight: "500",
  },
  listContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    alignSelf: "center",
    color: colors.black,
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: colors.black,
    fontSize: 20,
  },
  detailsText: {
    color: colors.secondary,
    fontSize: 20,
  },
  rightText: {
    // marginTop: 50,
    color: colors.black,
    fontSize: 15,
    alignSelf: "flex-end",
  },
});
