import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import ApartmentScreen from "../screens/ApartmentScreen";
import ChoreNavigation from "./ChoreNavigation";
import HomeButton from "./HomeButton";
import PaymentNavigation from "./PaymentNavigation";
import routes from "./routes";
import SuiteAccountScreen from "../screens/SuiteAccountScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName={routes.APARTMENT}
    tabBarOptions={{ showLabel: false }}
  >
    <Tab.Screen
      name={routes.PAYMENT_NAV}
      component={PaymentNavigation}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="wallet"
            color={color}
            size={size + 10}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.CHORE_NAV}
      component={ChoreNavigation}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="silverware-clean"
            color={color}
            size={size + 10}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.APARTMENT}
      component={ApartmentScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <HomeButton onPress={() => navigation.navigate(routes.APARTMENT)} />
        ),
      })}
    />
    <Tab.Screen
      name={routes.SUITE}
      component={SuiteAccountScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="account-group"
            color={color}
            size={size + 10}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.ACCOUNT_NAV}
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="account"
            color={color}
            size={size + 10}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
