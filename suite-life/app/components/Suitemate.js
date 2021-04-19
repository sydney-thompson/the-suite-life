import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

export default function Suitemate({
  name,
  photoURL = null,
  pronouns,
  style = null,
  textStyle = null,
}) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{
          uri: photoURL,
        }}
        style={styles.image}
        resizeMode={"contain"}
      />
      <View style={[styles.nameContainer, style]}>
        <AppText style={styles.title} numberOfLines={1}>
          {name}
        </AppText>

        {pronouns.length > 0 && (
          <AppText style={styles.text} numberOfLines={1}>
            {pronouns}
          </AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
  },
  image: { borderRadius: 30, height: 60, width: 60, marginRight: 15 },
  nameContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-evenly",
  },
  title: {
    color: colors.black,
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    color: colors.black,
    fontSize: 22,
  },
});
