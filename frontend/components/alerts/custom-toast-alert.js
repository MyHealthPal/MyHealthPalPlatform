import React from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';
import {
  Stylesheet,
  TouchableOpacity,
  Text,
  View,
  ShadowPropTypesIOS,
} from 'react-native';
import CustomCard from '../card/custom-card';
import IconBadge from '../iconBadge/custom-iconBadge';

// const toastConfig = {
//   success: ({ text1, props, ...rest }) => (
//     <View style={{ backgroundColor: '#212121' }}>
//       <Text>{text1}</Text>
//       <Text>{props.guid}</Text>
//     </View>
//   ),
//   error: () => {},
//   info: () => {},
//   any_custom_type: () => {},
// };

const toastConfig = {
  /* 
      overwrite 'success' type, 
      modifying the existing `BaseToast` component
    */
  success: ({ text1, text2, props, ...rest }) => (
    <View style={styles.container}>
      <CustomCard>
        <Text>{text1}</Text>
        <Text>{text2}</Text>
      </CustomCard>
    </View>
  ),
};

const CustomToastAlert = () => {
  return <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />;
};

export default CustomToastAlert;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '90%',
  },
  text: {
    fontFamily: 'Oxygen-Regular',
    color: 'white',
  },
});
