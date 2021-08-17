import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import CustomCard from '../../components/card/custom-card';
import { MainContext } from '../../context/MainContext';
import IconBadge from '../../components/iconBadge/custom-iconBadge';
import { humanDateString } from '../../utils/string-utils';
import * as SecureStore from 'expo-secure-store';

const VaccinationRecords = ({ navigation }) => {
  const [vaccineList, setVaccineList] = useState({});

  const context = useContext(MainContext);

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const containerClass = 'container' + capitalize(context.theme);
  const text2Class = 'text2' + capitalize(context.theme);

  const iconColor = context.theme == 'dark' ? '#484848' : '#e0e0e0';

  const getToken = () => {
    return SecureStore.getItemAsync('auth_token');
  };

  const handleAddVaccine = () => {
    // Navigate to the add page
  };

  const fetchVaccineList = async () => {
    let response;
    let json;

    getToken().then(async (token) => {
      response = await fetch(context.fetchPath + `api/getVaccineAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
        setVaccineList(json);
      }
    });
  };

  useEffect(() => {
    fetchVaccineList();
    navigation.setOptions({
        headerRight: () => (
          <View style={styles.headerActions}>
            <IconBadge
              library="Feather"
              icon="file-plus"
              size={25}
              color="#ffffff"
              style={styles.headerButton}
              onPress={handleAddVaccine}
            />
          </View>
        ),
      });
  }, []);

  return (
    <ScrollView style={[styles.container, styles[containerClass]]}>
      <View style={styles.wrapper}>
        {Object.keys(vaccineList).map((key) => {
          return (
            <CustomCard
              outerStyle={styles.outterCardStyling}
              onPress={() =>
                navigation.navigate('VaccinationInfo', {
                  id: vaccineList[key]['id'],
                })
              }
            >
              <View style={styles.innerContainer}>
                <View style={styles.textWrapper}>
                  <View style={styles.iconWrapper}>
                    <IconBadge
                      library="FontAwesome5"
                      noTouchOpacity={true}
                      color={'#ff8d4f'}
                      size={25}
                      icon={'syringe'}
                    />
                  </View>
                  <Text style={styles.text1}>{vaccineList[key]['agent']}</Text>
                </View>

                <View style={styles.textWrapper}>
                  <View style={styles.iconWrapper}>
                    <IconBadge
                      noTouchOpacity={true}
                      color={iconColor}
                      size={30}
                      icon={'calendar-month-outline'}
                    />
                  </View>
                  <Text style={[styles.text2, styles[text2Class]]}>
                    {humanDateString(
                      new Date(vaccineList[key]['date_of_dose'])
                    )}
                  </Text>
                </View>
                <View style={styles.textWrapper}>
                  <View style={styles.iconWrapper}>
                    <IconBadge
                      noTouchOpacity={true}
                      color={iconColor}
                      size={30}
                      icon={'map-marker'}
                    />
                  </View>
                  <Text style={[styles.text2, styles[text2Class]]}>
                    {vaccineList[key]['organization']}
                  </Text>
                </View>
              </View>
            </CustomCard>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: '#F8F8F8',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  headerActions: {
    marginRight: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    marginHorizontal: 8,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
  },
  outterCardStyling: {
    marginVertical: 10,
    width: '100%',
  },
  iconWrapper: { marginRight: 15 },
  text1: {
    color: '#ff8d4f',
    fontFamily: 'Oxygen-Bold',
    fontSize: 20,
  },
  text2: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 15,
  },
  text2Dark: {
    color: '#d1d1d1',
  },
  text2Light: {
    color: '#7e7e7e',
  },
  innerContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    padding: 15,
  },
  textWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default VaccinationRecords;
