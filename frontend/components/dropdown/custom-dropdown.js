import React, { useContext, useState } from 'react';
import { MainContext } from '../../context/MainContext';
import {
  Text,
  View,
  FlatList,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Triangle from 'react-native-triangle';

const CustomDropdown = (props) => {
  const { placeholder, selectedValue, items, width, height } = props;

  const [open, setOpen] = useState(false);

  const context = useContext(MainContext);

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const dropdownClass = 'dropdown' + capitalize(context.theme);
  const textClass = 'text' + capitalize(context.theme);

  return (
    <View style={{ width: width, height: height }}>
      <TouchableWithoutFeedback>
        <View style={[styles.dropdown, styles[dropdownClass]]}>
          <Text style={[styles.text, styles[textClass]]}>
            {!!selectedValue ? selectedValue : placeholder}
          </Text>
          <Triangle
            width={14}
            height={8}
            color={context.theme === 'dark' ? '#D1D1D1' : '#404040'}
            direction={open ? 'up' : 'down'}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 16,
  },
  textDark: {
    color: '#d1d1d1',
  },
  textLight: {
    color: '#404040',
  },

  dropdown: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  dropdownDark: {
    backgroundColor: '#404040',
  },
  dropdownLight: { backgroundColor: '#D1D1D1' },
});

export default CustomDropdown;
