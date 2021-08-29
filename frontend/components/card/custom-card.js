import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const CustomCard = (props) => {
  const { noTouchOpacity, outerStyle, innerStyle, onPress } = props;

  const context = useContext(MainContext);

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const cardClass = 'cardContainer' + capitalize(context.theme);

  return (
    <TouchableOpacity
      activeOpacity={noTouchOpacity ? 1 : 0.2}
      style={[styles.cardContainer, styles[cardClass], outerStyle]}
      onPress={onPress}
    >
      <View style={[styles.cardContent, innerStyle]}>{props.children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
  },
  cardContainerDark: {
    backgroundColor: '#212121',
  },
  cardContainerLight: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomCard;
