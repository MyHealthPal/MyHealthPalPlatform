import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const CustomCard = (props) => {
    const context = useContext(MainContext);
    
    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };
    
    const theme = (context.theme !== 'dark' ? capitalize(context.theme) : 'Dark');
    const cardClass = 'cardContainer' + theme;

   return (
        <TouchableOpacity style={[styles.cardContainer, styles[cardClass]]}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        elevation: 3,
        margin: 10,
    },
    cardContainerDark: {
        backgroundColor: '#404040',
    }, 
    cardContainerLight: {
        backgroundColor: '#ffffff',
        shadowOffset: { width: 0, height: 0},
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 5,
    }, 
    cardContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
});

export default CustomCard