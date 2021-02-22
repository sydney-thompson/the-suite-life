import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} />
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
