import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import TabButton from './TabButton';

const { width } = Dimensions.get('screen');

const CustomTabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState('Home');

  //remember to use context set the icon colours to be black or white (theme)
  const handleSelectedTab = (currentTab) =>  (currentTab === selected ? 'red' : 'black');

  // console.log(state.index)

  const handlePress = (currentTab, index) => {
    if(state.index !== index) {
      setSelected(currentTab); 
      navigation.navigate(currentTab);
    }
  }
  const { routes } = state;

    return (
        <View style={styles.outterContainer}>
            <View style={styles.innerContainer}>
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
        </View>
    )
}

const styles = StyleSheet.create({
  outterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '60px',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
});

export default CustomTabBar