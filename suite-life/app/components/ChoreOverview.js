import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

export default function ChoreOverview({
  day,
  details,
  frequency,
  name,
  style = null,
  textStyle = null,
}) {
  const frequencyAbbreviations = {
    Monday: "M",
    Tuesday: "T",
    Wednesday: "W",
    Thursday: "Th",
    Friday: "F",
    Saturday: "Sa",
    Sunday: "Su",
  };

  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.title} numberOfLines={1}>
        {name}
      </AppText>
      <View style={styles.icon}>
        <AppText style={[styles.text, styles.iconText]}>
          {frequencyAbbreviations[day]}
        </AppText>
      </View>
      {/* <AppText style={styles.text}>{`${frequency}`}</AppText> */}
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
    width: 160,
  },
  icon: {
    margin: 20,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.secondary,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  iconText: {
    color: colors.white,
    fontWeight: "500",
  },
  title: {
    alignSelf: "center",
    color: colors.black,
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    color: colors.black,
    fontSize: 22,
  },
  detailsText: {
    color: colors.secondary,
    fontSize: 20,
  },
});
