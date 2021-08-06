import React from 'react';
import { MainProvider } from './context/MainContext';

import MainCode from './MainCode';
import HealthScreens from './screens/healthScreens/exportHealthScreens';
import AddVaccScreen from './screens/vaccinationScreens/addVaccinationRecord';
import AuthenticationScreens from './screens/authenticationScreens/exportAuthenticationScreens';
import Navbar from './components/Navbar/Navbar';
import CustomToastAlert from './components/alerts/custom-toast-alert';

export default function App() {
  return (
    <MainProvider>
      <MainCode />
    </MainProvider>
  );
}
