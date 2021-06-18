import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabButton = ( {color, tab, onPress, icon }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            { icon && <MaterialCommunityIcons name={icon} size={28} color={color} /> }
            <Text style={{ color, fontFamily: 'Oxygen-Regular' }}>{tab.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default TabButton
