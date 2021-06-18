import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../button/custom-button';
import Toast from 'react-native-toast-message';

const Exercise = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Excerise screen!</Text>
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

export default Exercise;
