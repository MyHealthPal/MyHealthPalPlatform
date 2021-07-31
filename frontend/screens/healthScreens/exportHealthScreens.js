import React, { useState, useEffect } from 'react';
import VaccinationRecords from "./VaccinationRecords";
import VisionTest from "./VisionTest";
import PrescriptionTracking from "./PrescriptionTracking";
import {Stack} from '../../context/MainContext';

function HealthScreens() {
    return (
      <>
        <Stack.Screen name="VaccinationRecords" component={VaccinationRecords} />
        <Stack.Screen name="VisionTest" component={VisionTest} />
        <Stack.Screen name="PrecriptionTracking" component={PrescriptionTracking} />
      </>
    );
}

export default HealthScreens;