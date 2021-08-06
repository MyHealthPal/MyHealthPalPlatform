import React, { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { StyleSheet, View, Text } from "react-native";

const CustomHeader = ({ children, additionalStyles }) => {
  const context = useContext(MainContext);

  const txtColor = context.theme == "dark" ? "#D1D1D1" : "#212121";

  return (
    <View style={[styles.header]}>
      <Text
        style={[
          styles.text,
          additionalStyles ? additionalStyles : { color: txtColor },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 30,
    fontFamily: "Oxygen-Bold",
  },
});

export default CustomHeader;
