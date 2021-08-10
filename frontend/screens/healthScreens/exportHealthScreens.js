import React, { useContext } from 'react';
import VaccinationRecords from './VaccinationRecords';
import VisionTest from './VisionTest';
import PrescriptionTracking from './PrescriptionTracking';
import VaccinationInfo from './VaccinationInfo';
import { Stack } from '../../context/MainContext';

function HealthScreens() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#f62e4a',
          },
        }}
        name="VaccinationInfo"
        component={VaccinationInfo}
      ></Stack.Screen>
      <Stack.Screen name="VaccinationRecords" component={VaccinationRecords} />
      <Stack.Screen name="VisionTest" component={VisionTest} />
      <Stack.Screen
        name="PrecriptionTracking"
        component={PrescriptionTracking}
      />
    </>
  );
}

export default HealthScreens;
