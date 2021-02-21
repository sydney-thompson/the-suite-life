import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ApartmentScreen from "./app/screens/ApartmentScreen";
import ColorTestScreen from "./app/screens/ColorTestScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import {
  PaymentScreen,
  PaymentAddScreen,
  PaymentSuitemateScreen,
} from "./app/screens/payments";
import { ChoreScreen, ChoreAddScreen } from "./app/screens/chores";

export default function App() {
  return <ChoreAddScreen />;
}

const styles = StyleSheet.create({});
