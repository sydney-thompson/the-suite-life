import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import colors from "../config/colors";
import AppText from "./AppText";
import { auth } from "./firebase/firebase";
import { disconnectFromSuitemates, getSuitemates } from "./firebase/suites";
import { getUserData } from "./firebase/users";
import HorizontalSpaceSeparator from "./HorizontalSpaceSeparator";
import VerticalSpaceSeparator from "./VerticalSpaceSeparator";

export default function Chore({
  assignees,
  day,
  details,
  name,
  recurring,
  style = null,
  textStyle = null,
}) {
  const [assigneesList, setAssigneesList] = useState([]);
  const [suitemates, setSuitemates] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData().then((val) => {
      setUser(val);
    });
  }, [auth]);

  useEffect(() => {
    for (const [key, value] of Object.entries(assignees)) {
      if (value) {
        setAssigneesList([
          ...assigneesList,
          {
            id: key,
            color: value ? colors.secondary : colors.medium,
          },
        ]);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      getSuitemates(setSuitemates, user.suiteID);
    } else {
      setSuitemates([]);
    }
    return () => {
      disconnectFromSuitemates();
    };
  }, [user, setSuitemates]);

  //   useEffect(() => {
  //     // setAssigneeData([]);
  //     for (const [key, value] of Object.entries(assignees)) {
  //       getUserData(key)
  //         .then((userData) => {
  //           console.log("userData:", userData);
  //           if (value) {
  //             setAssigneeData([
  //               ...assigneeData,
  //               {
  //                 id: key,
  //                 name: userData.name,
  //                 color: value ? colors.secondary : colors.medium,
  //               },
  //             ]);
  //           }
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //         });
  //     }
  //     console.log("assigneeData:", assigneeData);
  //     return () => {
  //       //   cleanup
  //       console.log("cleaning");
  //     };
  //   }, [assignees, assigneeData, setAssigneeData]);

  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.title} numberOfLines={1}>
        {name}
      </AppText>
      <View style={styles.listContainer}>
        {/* <FlatList
          data={assigneesList}
          horizontal={true}
          keyExtractor={(assignee) => assignee.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.icon, { backgroundColor: item.color }]}>
              <AppText style={[styles.text, styles.iconText]}>
                {item.id in suitemates
                  ? suitemates[item.id].name[0]
                  : item.id[0]}
              </AppText>
            </View>
          )}
          ItemSeparatorComponent={VerticalSpaceSeparator}
        /> */}
        <FlatList
          data={suitemates}
          keyExtractor={(suitemate) => suitemate.id.toString()}
          numColumns={7}
          renderItem={({ item }) => (
            <View
              style={[
                styles.icon,
                {
                  backgroundColor: assignees[item.id]
                    ? colors.secondary
                    : colors.medium,
                },
              ]}
            >
              <AppText style={[styles.text, styles.iconText]}>
                {/* {item.id in suitemates
                  ? suitemates[item.id].name[0]
                  : item.id[0]} */}
                {item.name[0]}
              </AppText>
            </View>
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
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    color: colors.black,
    fontSize: 22,
    fontWeight: "600",
  },
  detailsText: {
    color: colors.secondary,
    fontSize: 20,
  },
});