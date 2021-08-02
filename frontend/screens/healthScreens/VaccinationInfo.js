import React, { useEffect, useContext, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { MainContext } from '../../context/MainContext';
import Toast from 'react-native-toast-message';

const VaccinationInfo = ({ id }) => {
  const context = useContext(MainContext);

  const [vaccineInfo, setVaccineInfo] = useState(null);

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const pageContainerClass = 'pageContainer' + capitalize(context.theme);

  const fetchVaccineInfo = async () => {
    let response;
    let json;

    response = await fetch(context.fetchPath + `api/getVaccine/${id}`, {
      method: 'GET',
      headers: {
        'x-access-tokens': token,
      },
    });

    json = await response.json();

    if (json.message) {
      Toast.show({
        text1: 'Error',
        text2: json.message,
        type: 'error',
      });
    } else {
      setVaccineInfo(json);
    }
  };

  useEffect(() => {
    fetchVaccineInfo();
  }, []);

  return (
    <SafeAreaView style={styles[pageContainerClass]}>
      <Text></Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainerLight: {
    backgroundColor: '#ffffff',
  },
  pageContainerDark: {
    backgroundColor: '#212121',
  },
});

export default VaccinationInfo;
