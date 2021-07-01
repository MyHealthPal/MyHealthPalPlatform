import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { StyleSheet, View, Text} from 'react-native';

const CustomHeader = ({children}) => {
    const context = useContext(MainContext);

    const txtColor = (context.theme=='dark'? '#FFFFFF': '#212121')

    return (
        <View style={[styles.header]}>
            <Text style={[styles.text,{color:txtColor}]}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
      backgroundColor: 'transparent'
    },
    text:{
      fontSize: 40,
      fontFamily: 'Oxygen-Bold'
    }
  });

export default CustomHeader
