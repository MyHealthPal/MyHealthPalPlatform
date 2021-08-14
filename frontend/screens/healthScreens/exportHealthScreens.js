import React, { useContext } from 'react';
import VaccinationRecords from './VaccinationRecords';
import VisionTest from './VisionTest';
import VaccinationInfo from './VaccinationInfo';
import PrescriptionScreens from '../prescriptionScreens/exportPrescriptionScreens';
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
      <Stack.Screen
        options={{
          // headerTransparent: false,
          headerStyle: {
            backgroundColor: '#f62e4a',
          },
          headerBackTitle: 'Health',
          headerTintColor: '#ffffff',
          title: 'Vaccination Records',
        }}
        name="VaccinationRecords"
        component={VaccinationRecords}
      />
      <Stack.Screen name="VisionTest" component={VisionTest} />
      {PrescriptionScreens()}
    </>
  );
}

export default HealthScreens;
