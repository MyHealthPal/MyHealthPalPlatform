import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomButton = (props) => {
  const { type, text, onPress, additionalStyling } = props;

  const context = useContext(MainContext);

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const buttonClass =
    'button' +
    capitalize(type) +
    (type !== 'emphasized' ? capitalize(context.theme) : '');

  const textClass =
    'text' + (type !== 'emphasized' ? capitalize(context.theme) : 'Dark');

  return buttonClass === 'buttonEmphasized' ? (
    <TouchableOpacity onPress={onPress} style={[additionalStyling]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#FC3636', '#E52883']}
        style={[styles.linearGradient, styles.buttonMain]}
      >
        <Text style={[styles.text, styles[textClass]]}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[styles.buttonMain, styles[buttonClass], additionalStyling]}
      onPress={onPress}
    >
      <Text style={[styles.text, styles[textClass]]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 18,
  },
  textDark: {
    color: '#ffffff',
  },
  textLight: {
    color: '#212121',
  },
  buttonMain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonOutlinedDark: {
    borderWidth: 1.5,
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
  },
  buttonOutlinedLight: {
    borderWidth: 1.5,
    borderColor: '#212121',
    backgroundColor: 'transparent',
  },
  buttonRegularDark: { backgroundColor: '#474747' },
  buttonRegularLight: { backgroundColor: '#D1D1D1' },
  linearGradient: {
    borderRadius: 12,
  },
});
export default CustomButton;
