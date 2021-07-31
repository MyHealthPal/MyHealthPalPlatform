import React, { useContext, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomCard from '../components/card/custom-card';
import CustomHeader from '../components/header/custom-header';
import CustomInputBox from '../components/inputBox/custom-inputBox';
import CustomButton from '../components/button/custom-button';
import LoadingIndicator from '../components/loadingIndicator/loadingIndicator';
import Toast from 'react-native-toast-message';
import { validate } from 'validate.js';
import signupValidation from '../validation/signup-validation';

const Signup = () => {
  const context = useContext(MainContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const errorCheckOrder = ['email', 'password', 'confirmPassword'];

  const handleSubmit = async () => {
    setLoading(true);

    // This validate function performs the error checking using the
    // signupValidation object and returns all the errors. If
    // there are no errors, then validationResult will be null
    const validationResult = validate(
      { email, password, confirmPassword },
      signupValidation
    );

    if (validationResult) {
      for (let error of errorCheckOrder) {
        if (validationResult[error]) {
          Toast.show({
            text1: 'Error',
            text2: validationResult[error][0],
            type: 'error',
          });
          break;
        }
      }
      setLoading(false);
    } else {
      let response;
      let json;

      response = await fetch(context.fetchPath + 'api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      json = await response.json();

      if (json.message === 'Successfully created user') {
        Toast.show({
          text1: 'Registered!',
          text2: 'A verification link has been sent to your email inbox.',
          type: 'success',
          visibilityTime: 10000,
        });
        //NAVIGATE BACK TO LOGIN PAGE HERE
      } else {
        Toast.show({
          text1: 'Error',
          text2: json.message,
          type: 'error',
        });
      }
      setLoading(false);
    }
  };

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
              onChange={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInputBox
              field="Password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInputBox
              field="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomButton
              onPress={handleSubmit}
              type="emphasized"
              text={
                loading ? (
                  <LoadingIndicator color="white" isAnimating={true} />
                ) : (
                  'Signup'
                )
              }
            />
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
    display: 'flex',
    minHeight: 400,
  },
  inputContainer: {
    flex: 1,
    width: '100%',
  },
});

export default Signup;
