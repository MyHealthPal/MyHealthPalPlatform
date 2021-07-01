import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Health = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Health screen!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#66bb6a',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Health
