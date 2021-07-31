import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const VisionTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VisionTest screen!</Text>
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

export default VisionTest;
