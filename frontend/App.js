import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { MainProvider } from './context/MainContext';
import { useFonts } from 'expo-font';
import CustomToastAlert from './components/alerts/custom-toast-alert';
import CustomPopupAlert from './components/alerts/custom-popup-alert';
import CustomButton from './components/button/custom-button';
import Signup from './screens/Signup';
import CreateProfile from './screens/CreateProfile';

const getList = async () => {
  try {
    let response = await fetch('http://localhost:5000/list');
    let json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};

//getList();
export default function App() {
  const [loaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Oxygen-Regular': require('./assets/fonts/Oxygen-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Oxygen-Bold': require('./assets/fonts/Oxygen-Bold.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Oxygen-Light': require('./assets/fonts/Oxygen-Light.ttf'),
  });
  const [popupAlert, setPopupAlert] = useState(false);

  return (
    loaded && (
      <>
        <MainProvider>
          <CreateProfile />
          <CustomToastAlert />
        </MainProvider>
      </>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Oxygen-Regular',
    color: 'white',
  },
});
