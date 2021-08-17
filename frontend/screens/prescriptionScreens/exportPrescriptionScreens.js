import React, { useContext } from "react";
import PrescriptionInfo from "./PrescriptionInfo";
import PrescriptionTracking from "./PrescriptionTracking";
import { Stack } from "../../context/MainContext";

function PrescriptionScreens() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: "#ffffff",
          headerStyle: {
            backgroundColor: "#f62e4a",
          },
          title: "Prescription Tracker",
        }}
        name="PrescriptionTracking"
        component={PrescriptionTracking}
      />
      <Stack.Screen
        options={{
          headerTintColor: "#ffffff",
          headerStyle: {
            backgroundColor: "#f62e4a",
          },
        }}
        name="PrescriptionInfo"
        component={PrescriptionInfo}
      ></Stack.Screen>
    </>
  );
}

export default PrescriptionScreens;
