import React, { useContext } from "react";
import VaccinationInfo from "./VaccinationInfo";
import AddUpdateVaccinationRecords from "./addVaccinationRecord";
import VaccinationRecords from "./VaccinationRecords";
import { Stack } from "../../context/MainContext";

function VaccinationScreens() {
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#f62e4a",
          },
          // headerBackTitle: "Health",
          headerTintColor: "#ffffff",
          title: "Vaccination Records",
        }}
        name="VaccinationRecords"
        component={VaccinationRecords}
      />
      <Stack.Screen
        options={{
          headerTintColor: "#ffffff",
          headerStyle: {
            backgroundColor: "#f62e4a",
          },
        }}
        name="VaccinationInfo"
        component={VaccinationInfo}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerTintColor: "#ffffff",
          headerStyle: {
            backgroundColor: "#f62e4a",
          },
        }}
        name="AddUpdateVaccinationRecords"
        component={AddUpdateVaccinationRecords}
      ></Stack.Screen>
    </>
  );
}

export default VaccinationScreens;
