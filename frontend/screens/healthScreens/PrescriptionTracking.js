import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PrescriptionTracking = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PrescriptionTracking screen!</Text>
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

export default PrescriptionTracking;
