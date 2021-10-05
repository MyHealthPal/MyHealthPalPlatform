import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { MainContext, Stack } from "./context/MainContext";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import HealthScreens from "./screens/healthScreens/exportHealthScreens";
import AuthenticationScreens from "./screens/authenticationScreens/exportAuthenticationScreens";
import Navbar from "./components/Navbar/Navbar";
import CustomToastAlert from "./components/alerts/custom-toast-alert";

export default function MainCode() {
  const context = useContext(MainContext);

  const [loaded] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Oxygen-Regular": require("./assets/fonts/Oxygen-Regular.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Oxygen-Bold": require("./assets/fonts/Oxygen-Bold.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Oxygen-Light": require("./assets/fonts/Oxygen-Light.ttf"),
  });

  return (
    loaded && (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            {AuthenticationScreens()}
            <Stack.Screen
              options={{ headerShown: false }}
              name="Navbar"
              component={Navbar}
            ></Stack.Screen>
            {HealthScreens()}
          </Stack.Navigator>
        </NavigationContainer>
        <CustomToastAlert />
      </>
    )
  );
}
