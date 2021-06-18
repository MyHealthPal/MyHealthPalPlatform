import React from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Stylesheet, TouchableOpacity, Text, View } from 'react-native';

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
    <View style={{ height: 60, width: '100%', backgroundColor: 'pink' }}>
      <Text>{text1}</Text>
      <Text>{text2}</Text>
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
    borderRadius: 12,
  },
  text: {
    fontFamily: 'Oxygen-Regular',
    color: 'white',
  },
});
