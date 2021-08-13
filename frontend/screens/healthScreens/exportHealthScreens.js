import React, { useContext } from "react";
import VisionTest from "./VisionTest";
import PrescriptionScreens from "../prescriptionScreens/exportPrescriptionScreens";
import { Stack } from "../../context/MainContext";
import VaccinationScreens from "../vaccinationScreens/exportVaccinationScreens";

function HealthScreens() {
  return (
    <>
      {VaccinationScreens()}
      {PrescriptionScreens()}
      <Stack.Screen name="VisionTest" component={VisionTest} />
    </>
  );
}

export default HealthScreens;
