import React, { useContext } from "react";
import VaccinationRecords from "./VaccinationRecords";
import VisionTest from "./VisionTest";
import PrescriptionTracking from "./PrescriptionTracking";
import VaccinationInfo from "./VaccinationInfo";
import { Stack, MainContext } from "../../context/MainContext";

function HealthScreens() {
  const context = useContext(MainContext);
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerBackTitle: "Login",
          headerTintColor: context.theme === "dark" ? "#ffffff" : "#212121",
          title: "",
        }}
        name="VaccinationInfo"
        component={VaccinationInfo}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          // headerTransparent: false,
          headerStyle: {
            backgroundColor: "#f62e4a",
          },
          headerBackTitle: "Health",
          headerTintColor: "#ffffff",
          title: "Vaccination Records",
        }}
        name="VaccinationRecords"
        component={VaccinationRecords}
      />
      <Stack.Screen name="VisionTest" component={VisionTest} />
      <Stack.Screen
        name="PrecriptionTracking"
        component={PrescriptionTracking}
      />
    </>
  );
}

export default HealthScreens;
