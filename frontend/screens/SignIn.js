import React, { useContext, useState } from "react";
import { MainContext } from "../context/MainContext";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomCard from "../components/card/custom-card";
import CustomHeader from "../components/header/custom-header";
import CustomInputBox from "../components/inputBox/custom-inputBox";
import CustomButton from "../components/button/custom-button";

const Signin = () => {
  const context = useContext(MainContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={context.gradient}
      style={styles.mainContainer}
    >
      <View style={styles.upperContainer}>
        <CustomHeader style={styles.signinHeader}>Sign in</CustomHeader>
      </View>
      <CustomCard
        outerStyle={styles.lowerOuterContainer}
        innerStyle={styles.lowerInnerContainer}
        noTouchOpacity
      >
        <CustomHeader style={styles.header}>Welcome Back</CustomHeader>
        <View style={styles.inputContainer}>
          <CustomInputBox
            field="Email"
            placeholder="Enter your email address"
            value={email}
            onChange={(value) => setEmail(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomInputBox
            field="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </View>

        <Text style={styles.forgot}>Forgot Password?</Text>

        <View style={styles.inputContainer}>
          <CustomButton type="emphasized" text="Sign in" />
        </View>

        <View style={styles.createAccountContainer}>
          <Text style={styles.bottomText}>Don't have an account? </Text>
          <Text style={styles.textButton}>Sign Up</Text>
        </View>
      </CustomCard>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  signinHeader: { color: "#ffffff" },
  createAccountHeader: { marginBottom: 30 },
  upperContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flex: 1,
    padding: 40,
  },
  lowerOuterContainer: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 4,
    margin: 0,
    padding: 40,
  },
  lowerInnerContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    minHeight: 400,
  },
  inputContainer: {
    width: "100%",
  },
  createAccountContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  bottomText: {
    fontSize: 16,
  },
  textButton: {
    fontSize: 16,
    color: "#ff8d4f",
  },
  forgot: {
    fontSize: 20,
    color: "#ff8d4f",
  },
});

export default Signin;
