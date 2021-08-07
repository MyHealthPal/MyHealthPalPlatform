import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import { MainContext } from '../../context/MainContext';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';

const VaccinationInfo = ({ id }) => {
  const context = useContext(MainContext);

  const statusHeight = StatusBar.currentHeight;

  const [vaccineInfo, setVaccineInfo] = useState(null);

  const getToken = () => {
    return SecureStore.getItemAsync('auth_token');
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const pageContainerClass = 'pageContainer' + capitalize(context.theme);

  const fetchVaccineInfo = async () => {
    let response;
    let json;

    getToken().then(async (token) => {
      response = await fetch(
        context.fetchPath +
          `api/getVaccine/${'1481f33a-1dc0-4e31-9781-3c6bcd5f8851'}`,
        {
          method: 'GET',
          headers: {
            'x-access-tokens': token,
          },
        }
      );

      json = await response.json();

      if (json.message) {
        Toast.show({
          text1: 'Error',
          text2: json.message,
          type: 'error',
        });
      } else {
        console.log(Object.entries(json));
        setVaccineInfo(Object.entries(json));
      }
    });
  };

  useEffect(() => {
    fetchVaccineInfo();
  }, []);

  return (
    <SafeAreaView
      style={(styles[pageContainerClass], { marginTop: statusHeight })}
    >
      <Text>{vaccineInfo ? 'Found info' : 'User does not exist.'}</Text>
      {/* <FlatList
        style={styles.flatlistContainer}
        data={vaccineInfo}
        renderItem={renderItem}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainerLight: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  pageContainerDark: {
    backgroundColor: '#212121',
    height: '100%',
  },
});

export default VaccinationInfo;
