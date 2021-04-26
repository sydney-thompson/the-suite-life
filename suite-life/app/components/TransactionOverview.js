import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";
import colors from "../config/colors";
import AppText from "./text/AppText";
import Dollar from "./Dollar";
import { getUserData } from "./firebase/users";

export default function TransactionOverview({
  amount,
  details,
  title,
  payer,
  payee,
  item,
  style = null,
  textStyle = null,
}) {
  const [payerData, setPayerData] = useState(null);
  const [payeeData, setPayeeData] = useState(null);

  useEffect(() => {
    getUserData(payee).then((val) => {
      setPayeeData(val);
    });
  }, []);

  useEffect(() => {
    getUserData(payer).then((val) => {
      setPayerData(val);
    });
  }, []);

  let color = "medium";
  if (parseFloat(amount) < 0) {
    color = "danger";
  } else if (parseFloat(amount) > 0) {
    color = "primary";
  }

  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.title} numberOfLines={1}>
        {title}
      </AppText>
      {payerData && payeeData && (
        <Image
          source={
            amount < 0
              ? {
                  uri: payerData.photoURL,
                }
              : { uri: payeeData.photoURL }
          }
          style={styles.iconImage}
          resizeMode={"contain"}
        />
      )}
      <View style={styles.icon}>
        <Dollar style={[styles.text, styles.money, { color: colors[color] }]}>
          {amount}
        </Dollar>
      </View>
      <AppText style={styles.detailsText} numberOfLines={2}>
        {details}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-evenly",
    padding: 5,
  },
  icon: {
    margin: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  money: {
    color: colors.secondary,
    fontWeight: "300",
    fontSize: 35,
  },
  iconText: {
    color: colors.white,
    fontWeight: "500",
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
  title: {
    alignSelf: "center",
    color: colors.black,
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    color: colors.black,
    fontSize: 20,
    alignSelf: "flex-end",
  },
  detailsText: {
    color: colors.secondary,
    fontSize: 20,
    alignSelf: "flex-end",
  },
});
