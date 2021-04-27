import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import {
  ChoreEditScreen,
  ChoreAddScreen,
  ChoreScreen,
} from "../screens/chores";

const Stack = createStackNavigator();

const ChoreNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.CHORES} component={ChoreScreen} />
  </Stack.Navigator>
);

export default ChoreNavigation;
