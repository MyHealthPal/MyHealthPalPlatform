import React, { useContext } from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';
import { MainContext } from '../../context/MainContext';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ShadowPropTypesIOS,
} from 'react-native';
import CustomCard from '../card/custom-card';
import IconBadge from '../iconBadge/custom-iconBadge';

const CustomToastAlert = () => {
  const context = useContext(MainContext);

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const text1Class = 'text1' + capitalize(context.theme);
  const text2Class = 'text2' + capitalize(context.theme);

  const renderToast = ({ color, icon, text1, text2, hide, props, ...rest }) => {
    return (
      <CustomCard
        noTouchOpacity={true}
        style={[styles.outerContainer, { borderColor: color }]}
      >
        <View style={styles.innerContainer}>
          <View style={styles.iconWrapper}>
            <IconBadge color={color} size={40} icon={icon} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={[styles.text1, styles[text1Class], { color }]}>
              {text1}
            </Text>
            <Text style={[styles.text2, styles[text2Class]]}>{text2}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <IconBadge
              color={context.theme === 'dark' ? '#ffffff' : '#212121'}
              size={20}
              icon={'close'}
              onPress={hide}
            />
          </View>
        </View>
      </CustomCard>
    );
  };

  const toastConfig = {
    success: ({ text1, text2, hide, props, ...rest }) =>
      renderToast({
        color: '#27ae60',
        icon: 'check-circle-outline',
        text1,
        text2,
        hide,
        props,
        ...rest,
      }),
    error: ({ text1, text2, hide, props, ...rest }) =>
      renderToast({
        color: '#FC3636',
        icon: 'alert-circle-outline',
        text1,
        text2,
        hide,
        props,
        ...rest,
      }),
    info: ({ text1, text2, hide, props, ...rest }) =>
      renderToast({
        color: '#3498db',
        icon: 'information-outline',
        text1,
        text2,
        hide,
        props,
        ...rest,
      }),
  };

  return <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />;
};

export default CustomToastAlert;

const styles = StyleSheet.create({
  outerContainer: {
    width: '90%',
    borderWidth: 2,
  },

  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  iconWrapper: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 7,
  },
  text1: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 16,
  },
  text2: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 14,
  },
  text1Dark: {
    color: '#ffffff',
  },
  text1Light: {
    color: '#212121',
  },
  text2Dark: {
    color: '#d1d1d1',
  },
  text2Light: {
    color: '#404040',
  },
});
