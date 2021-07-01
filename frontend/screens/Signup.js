import React, { useContext, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomCard from '../components/card/custom-card';
import CustomHeader from '../components/header/custom-header';
import CustomInputBox from '../components/inputBox/custom-inputBox';
import CustomButton from '../components/button/custom-button';

const Signup = () => {
  const context = useContext(MainContext);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={context.gradient}
      style={styles.mainContainer}
    >
      <View style={styles.upperContainer}>
        <CustomHeader style={styles.signupHeader}>Signup</CustomHeader>
      </View>
      <CustomCard
        outerStyle={styles.lowerOuterContainer}
        innerStyle={styles.lowerInnerContainer}
        noTouchOpacity
      >
        <View style={styles.allInputContainer}>
          <CustomHeader style={styles.createAccountHeader}>
            Create Account
          </CustomHeader>
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
              field="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(value) => setFirstName(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInputBox
              field="Last Name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(value) => setLastName(value)}
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
          <View style={styles.inputContainer}>
            <CustomInputBox
              field="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(value) => setConfirmPassword(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomButton type="emphasized" text="Signup" />
          </View>
        </View>
      </CustomCard>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  signupHeader: { color: '#ffffff' },
  createAccountHeader: { marginBottom: 30 },
  upperContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flex: 1,
    padding: 40,
  },
  lowerOuterContainer: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 4,
    margin: 0,
    padding: 40,
  },
  lowerInnerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  allInputContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 400,
  },
  inputContainer: {
    flex: 1,
    width: '100%',
  },
});

export default Signup;
