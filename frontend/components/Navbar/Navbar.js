import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Health from "../../screens/Health";
import Profile from "../../screens/Profile";
import CustomTabBar from "./CustomTabBar";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const Navbar = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Health"
        component={Health}
        initialParams={{ icon: "heart-pulse" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ icon: "account-outline" }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
