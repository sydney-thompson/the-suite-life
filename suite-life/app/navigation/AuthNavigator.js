import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  CreateSuiteScreen,
  LoginScreen,
  JoinSuiteScreen,
  RegisterScreen,
  NewVsExistingScreen,
  WelcomeScreen,
} from "../screens/login";
import routes from "./routes";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} />
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
    <Stack.Screen name={routes.NEWEXIST} component={NewVsExistingScreen} />
    <Stack.Screen name={routes.CREATE_SUITE} component={CreateSuiteScreen} />
    <Stack.Screen name={routes.JOIN_SUITE} component={JoinSuiteScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
