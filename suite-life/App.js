import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import ColorTestScreen from "./app/screens/ColorTestScreen";

export default function App() {
  return <NavigationContainer theme={navigationTheme}>
  <AppNavigator />
</NavigationContainer>;
}
