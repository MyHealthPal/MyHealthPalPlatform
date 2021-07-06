import React from 'react';
import { ActivityIndicator } from 'react-native';

const LoadingIndicator = (props) => {
  const { isAnimating } = props;

  return (
    <ActivityIndicator
      size="large"
      color={props.color ?? '#ff1744'}
      animating={isAnimating}
    />
  );
};

export default LoadingIndicator;
