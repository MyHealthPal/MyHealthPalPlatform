import React, { useContext, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomCard from '../components/card/custom-card';
import CustomHeader from '../components/header/custom-header';
import CustomInputBox from '../components/inputBox/custom-inputBox';
import CustomButton from '../components/button/custom-button';
import LoadingIndicator from '../components/loadingIndicator/loadingIndicator';
import Toast from 'react-native-toast-message';
import { validate } from 'validate.js';
import createProfileValidation from '../validation/create-profile-validation';
import CustomAvatar from '../components/avatar/custom-avatar';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as SecureStore from 'expo-secure-store';

const CreateProfile = () => {
  const context = useContext(MainContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState(undefined);
  const [healthCard, setHealthCard] = useState('');
  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const errorCheckOrder = [
    'firstName',
    'lastName',
    'DateOfBirth',
    'healthCard',
  ];

  const getUTCDateFormat = (date) => {
    let todayUTC = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return todayUTC.toISOString().slice(0, 10);
  };

  const getToken = () => {
    return SecureStore.getItemAsync('auth_token');
  };

  const handleDateOfBirthConfirm = (date) => {
    setShowDatePicker(false);
    setDateOfBirth(date);
  };

  const handleSubmit = async () => {
    setLoading(true);

    // This validate function performs the error checking using the
    // signupValidation object and returns all the errors. If
    // there are no errors, then validationResult will be null
    const validationResult = validate(
      { firstName, lastName, DateOfBirth, healthCard },
      createProfileValidation
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

      getToken().then(async (token) => {
        response = await fetch(context.fetchPath + 'api/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-tokens': token,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            healthCard,
            DateOfBirth: getUTCDateFormat(DateOfBirth),
          }),
        });

        json = await response.json();

        if (json.message === 'User was created') {
          Toast.show({
            text1: 'User Profile Created!',
            text2: 'Your user profile has been successfully created.',
            type: 'success',
          });
          //NAVIGATE BACK TO NAVBAR PAGE
        } else {
          Toast.show({
            text1: 'Error',
            text2: 'Something went wrong :(. Please try again later.',
            type: 'error',
          });
        }
        setLoading(false);
      });
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
        <CustomAvatar title={firstName.charAt(0) + lastName.charAt(0)} />
      </View>
      <CustomCard
        outerStyle={styles.lowerOuterContainer}
        innerStyle={styles.lowerInnerContainer}
        noTouchOpacity
      >
        <View style={styles.allInputContainer}>
          <CustomHeader style={styles.createAccountHeader}>
            Setup Profile
          </CustomHeader>
          <View style={styles.inputContainer}>
            <CustomInputBox
              field="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={setFirstName}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInputBox
              field="Last Name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={setLastName}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View pointerEvents="none">
                <CustomInputBox
                  field="Date of Birth"
                  placeholder="Select your date of birth"
                  value={(DateOfBirth && getUTCDateFormat(DateOfBirth)) ?? ''}
                  onChange={setDateOfBirth}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <CustomInputBox
              field="Health Card Number (Optional)"
              placeholder="Enter your health card number"
              value={healthCard}
              onChange={setHealthCard}
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
                  'Complete'
                )
              }
            />
          </View>
        </View>
      </CustomCard>
      <DateTimePickerModal
        isVisible={showDatePicker}
        date={DateOfBirth}
        mode="date"
        onConfirm={handleDateOfBirthConfirm}
        onCancel={() => setShowDatePicker(false)}
      />
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
    alignItems: 'center',
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

export default CreateProfile;
