import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import {
  PaymentAddScreen,
  PaymentHistoryScreen,
  PaymentScreen,
} from "../screens/payments";

const Stack = createStackNavigator();

const PaymentNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.PAYMENTS} component={PaymentScreen} />
    <Stack.Screen
      name={routes.PAYMENT_HISTORY}
      component={PaymentHistoryScreen}
    />
    <Stack.Screen name={routes.PAYMENT_ADD} component={PaymentAddScreen} />
  </Stack.Navigator>
);

export default PaymentNavigator;
