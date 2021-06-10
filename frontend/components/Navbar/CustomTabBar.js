import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const CustomTabBar = (props) => {

    return (
        <View style={styles.OutterContainer}>
            <View style={styles.InnerContainer}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  OutterContainer: {
    position: 'absolute',
    bottom: 20,
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  InnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 100,
    elevation: 2,
  },
});

export default CustomTabBar
