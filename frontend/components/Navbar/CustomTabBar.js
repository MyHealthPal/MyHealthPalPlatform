import React, { useState, useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import TabButton from './TabButton';

const CustomTabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState('Home');

  const context = useContext(MainContext);

   const capitalize = (word) => {
     return word.charAt(0).toUpperCase() + word.slice(1);
   };

  const theme = (context.theme !== 'dark' ? capitalize(context.theme) : 'Dark');
  const containerClass = 'container' + theme;
  const fontColor = (context.theme !== 'dark' ? '#212121' : '#ffffff');

  const handleSelectedTab = (currentTab) =>  (currentTab === selected ? fontColor : '#9e9e9e');

  const handlePress = (currentTab, index) => {
    if(state.index !== index) {
      setSelected(currentTab); 
      navigation.navigate(currentTab);
    }
  }

  const { routes } = state;

  return (
      <View style={[styles.container, styles[containerClass]]}>
            {routes.map( (route, index) => (    
              <TabButton 
                tab={route}
                icon={route.params.icon}
                onPress={ () => handlePress(route.name, index) }
                color={handleSelectedTab(route.name)}
                key={route.key}
              />
            ))}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    elevation: 2,
    borderColor: '#9e9e9e',
    borderTopWidth: 1,
  },
  containerDark: {
    backgroundColor: '#212121',
  },
  containerLight: {
    backgroundColor: '#ffffff',
  },
});

export default CustomTabBar