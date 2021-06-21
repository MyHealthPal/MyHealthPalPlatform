import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const IconBadge = ({
  color,
  badgeColor,
  badgeCount,
  onPress,
  icon,
  size,
  noTouchOpacity,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={noTouchOpacity ? 1 : 0.2}
      style={[styles.container]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={size} color={color} />
      {badgeCount > 0 ? (
        <View style={[styles.badgeContainer, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeContent}>{badgeCount}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  badgeContainer: {
    position: 'absolute',
    display: 'flex',
    right: 0,
    top: 0,
    borderRadius: 100,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: 9 }, { translateY: -5 }],
    //borderColor: '#212121',
    //borderWidth: 2
  },
  badgeContent: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Oxygen-Bold',
  },
});

export default IconBadge;
