import React from "react";
import { ActivityIndicator } from "react-native";

const LoadingIcon = (props) => {
  const { isAnimating } = props;

  return (
    <ActivityIndicator size="large" color="#ff1744" animating={isAnimating} />
  );
};

export default LoadingIcon;
