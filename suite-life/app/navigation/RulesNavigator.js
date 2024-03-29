import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import ViewRulesScreen from "../screens/ViewRulesScreen";
import AccountScreen from "../screens/SuiteAccountScreen";

const Stack = createStackNavigator();

const RulesNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.SUITE} component={AccountScreen} />
    <Stack.Screen name={routes.RULES} component={ViewRulesScreen} />
  </Stack.Navigator>
);

export default RulesNavigator;
