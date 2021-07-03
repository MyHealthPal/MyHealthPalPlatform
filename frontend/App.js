import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { MainProvider } from './context/MainContext';
import { useFonts } from 'expo-font';
import CustomToastAlert from './components/alerts/custom-toast-alert';
import CustomPopupAlert from './components/alerts/custom-popup-alert';
import CustomButton from './components/button/custom-button';

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
          <View style={styles.container}>
            <Text style={styles.text}>
              Open up App.js to start working on your app!
            </Text>
            <CustomButton
              text="Show Popup Alert"
              type="emphasized"
              onPress={() => setPopupAlert(true)}
            />
          </View>

          <CustomPopupAlert
            open={popupAlert}
            color={'#FC3636'}
            icon={'alert-circle'}
            title="Error!"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra elit nec malesuada imperdiet. In ultrices arcu lectus, quis molestie elit sollicitudin vitae. Vestibulum elementum mi tortor, eget tincidunt diam bibendum vitae."
            buttons={[
              {
                text: 'Cancel',
                type: 'outlined',
                onPress: () => setPopupAlert(false),
              },
              {
                text: 'OK',
                type: 'regular',
                backgroundColor: '#FC3636',
                onPress: () => setPopupAlert(false),
              },
            ]}
          />
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
