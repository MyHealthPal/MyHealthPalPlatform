import React, { useContext } from "react";
import VaccinationInfo from "./VaccinationInfo";
import { StyleSheet } from "react-native";
import AddUpdateVaccinationRecords from "./addUpdateVaccinationRecord";
import VaccinationRecords from "./VaccinationRecords";
import { LinearGradient } from "expo-linear-gradient";
import { MainContext, Stack } from "../../context/MainContext";

function VaccinationScreens() {
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
          // headerBackTitle: "Health",
          headerTintColor: "#ffffff",
          title: "Vaccination Records",
        }}
        name="VaccinationRecords"
        component={VaccinationRecords}
      />
      <Stack.Screen
        options={{
          headerBackground,
          headerTintColor: "#ffffff",
        }}
        name="VaccinationInfo"
        component={VaccinationInfo}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerBackground,
          headerTintColor: "#ffffff",
          title: "",
        }}
        name="AddUpdateVaccinationRecords"
        component={AddUpdateVaccinationRecords}
      ></Stack.Screen>
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

export default VaccinationScreens;
