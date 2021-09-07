import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import PrescriptionInfo from "./PrescriptionInfo";
import PrescriptionTracking from "./PrescriptionTracking";
import AddUpdatePrescriptionRecords from "./addUpdatePrescriptionRecord";
import { LinearGradient } from "expo-linear-gradient";
import { MainContext, Stack } from "../../context/MainContext";

function PrescriptionScreens() {
  const context = useContext(MainContext);
  const headerBackground = () => (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={context.gradient}
      style={styles.header}
    />
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerBackground,
          headerTintColor: "#ffffff",
          title: "Prescription Tracker",
        }}
        name="PrescriptionTracking"
        component={PrescriptionTracking}
      />
      <Stack.Screen
        options={{
          headerBackground,
          headerTintColor: "#ffffff",
        }}
        name="PrescriptionInfo"
        component={PrescriptionInfo}
      />
      <Stack.Screen
        options={{
          headerBackground,
          headerTintColor: "#ffffff",
        }}
        name="AddUpdatePrescriptionRecords"
        component={AddUpdatePrescriptionRecords}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
});

export default PrescriptionScreens;
