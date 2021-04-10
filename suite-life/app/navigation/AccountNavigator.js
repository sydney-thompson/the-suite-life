import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import { AccountScreen, AccountEditScreen, TestingResScreen } from "../screens/account";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
    <Stack.Screen name={routes.ACCOUNT_EDIT} component={AccountEditScreen} />
    <Stack.Screen name={routes.TESTING_RES} component={TestingResScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
