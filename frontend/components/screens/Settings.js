import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings screen!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd54f',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Settings
