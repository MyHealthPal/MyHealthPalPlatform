import React, { useContext, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomCard from '../components/card/custom-card';
import CustomHeader from '../components/header/custom-header';
import CustomInputBox from '../components/inputBox/custom-inputBox';
import CustomButton from '../components/button/custom-button';
import LoadingIndicator from '../components/loadingIndicator/loadingIndicator';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';

const Profile = ({ navigation }) => {
  const context = useContext(MainContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const errorCheckOrder = ['email', 'password'];

  const setToken = (token) => {
    return SecureStore.setItemAsync('auth_token', token);
  };

  const handleSubmit = async () => {
    setLoading(true);

    // This validate function performs the error checking using the
    // signupValidation object and returns all the errors. If
    // there are no errors, then validationResult will be null
    const validationResult = validate({ email, password }, signinValidation);

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

      response = await fetch(context.fetchPath + '/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      json = await response.json();

      if (json.token) {
        setToken(json.token);
        navigation.navigate('Navbar');
      } else if (json.message === 'verify email') {
        Toast.show({
          text1: 'Verify Email',
          text2:
            'Please verify your account by clicking the link sent to your email.',
          type: 'info',
        });
      } else if (json.message === 'There was an error logging in') {
        Toast.show({
          text1: 'Error',
          text2: 'Your email or password may be incorrect.',
          type: 'error',
        });
      } else {
        Toast.show({
          text1: 'Error',
          text2: 'An error occured while trying to log in. Please try again.',
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
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            <Image
              source={require('../assets/avatar.png')}
              style={styles.image}
              resizeMode="center"
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.username}>Bruce Banner</Text>
            <Text style={styles.email}>batman@DC.com</Text>
          </View>
        </View>
      </View>
      <CustomCard
        outerStyle={[
          styles.lowerOuterContainer,
          context.theme === 'dark'
            ? { backgroundColor: '#000000' }
            : { backgroundColor: '#F8F8F8' },
        ]}
        innerStyle={styles.lowerInnerContainer}
        noTouchOpacity
      >
        <CustomHeader style={styles.header}>Profile Info</CustomHeader>
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
  signinHeader: { color: '#ffffff' },
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 400,
  },
  inputContainer: {
    width: '100%',
  },
  createAccountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomText: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 16,
  },
  signupButton: {
    marginLeft: 5,
  },
  profileContainer: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    overflow: 'hidden',
  },
  username: {
    color: '#52575D',
    fontWeight: '200',
    fontSize: 20,
  },
  email: {
    color: '#AEB5BC',
    fontSize: 14,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});

export default Profile;
