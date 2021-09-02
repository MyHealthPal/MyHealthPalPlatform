import React, { useContext } from 'react';
import { Avatar } from 'react-native-elements';
import { MainContext } from '../../context/MainContext';

const CustomAvatar = ({ title, size }) => {
  const context = useContext(MainContext);

  return (
    <Avatar
      size={size}
      rounded
      title={title}
      icon={{ name: 'user', type: 'font-awesome-5', color: '#ff8d4f' }}
      overlayContainerStyle={{
        backgroundColor: context.theme === 'dark' ? '#404040' : '#ffffff',
      }}
      activeOpacity={1}
      titleStyle={{ color: '#ff8d4f' }}
    />
  );
};

export default CustomAvatar;
