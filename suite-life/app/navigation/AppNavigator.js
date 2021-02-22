import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ApartmentScreen from "../screens/ApartmentScreen";
import ChoreNavigation from "./ChoreNavigation";
import HomeButton from "./HomeButton";
import PaymentNavigation from "./PaymentNavigation";
import routes from "./routes";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator tabBarOptions={{ showLabel: false }}>
    <Tab.Screen
      name={routes.PAYMENT_NAV}
      component={PaymentNavigation}
      options={{
        tabBarLabel: "Payments",
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
      name={routes.APARTMENT}
      component={ApartmentScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <HomeButton onPress={() => navigation.navigate(routes.APARTMENT)} />
        ),
      })}
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
  </Tab.Navigator>
);

export default AppNavigator;
