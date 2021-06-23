import React from "react";
import { ActivityIndicator } from "react-native";

const LoadingIcon = (props) => {
  const { isLoading } = props;

  return (
    <ActivityIndicator size="large" color="#ff1744" animating={isLoading} />
  );
};

export default LoadingIcon;
