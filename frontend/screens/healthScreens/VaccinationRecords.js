import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const VaccinationRecords = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VaccinationRecords screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#42a5f5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default VaccinationRecords;
