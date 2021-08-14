import React, { useContext, useEffect } from 'react';
import { MainContext } from '../../context/MainContext';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../components/button/custom-button';
import * as SecureStore from 'expo-secure-store';

const WelcomePage = ({ navigation }) => {
  const context = useContext(MainContext);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const getToken = () => {
    return SecureStore.getItemAsync('auth_token');
  };

  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        navigation.navigate('Navbar');
      }
    });
  }, []);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={context.gradient}
      style={[styles.container]}
    >
      <View style={styles.content}>
        <Image
          style={[
            styles.imageContainer,
            { maxWidth: 0.9 * windowWidth, maxHeight: 0.4 * windowHeight },
          ]}
          source={require('../../assets/welcome-page-pic.png')}
        />

        <Text style={styles.header}>Welcome</Text>
        <Text style={styles.text1}>Manage your health and fitness</Text>
        <Text style={styles.text2}>the smart way</Text>

        <CustomButton
          type="regular"
          text="Sign in"
          additionalStyling={[styles.button, styles.solidButton]}
          textColor="#212121"
          onPress={() => navigation.navigate('Signin')}
        />
        <CustomButton
          type="outlined"
          text="Create an account"
          additionalStyling={styles.button}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 30,
    marginBottom: 30,
  },
  header: {
    fontFamily: 'Oxygen-Regular',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 0,
  },
  text1: {
    fontFamily: 'Oxygen-Regular',
    color: 'white',
    fontSize: 15,
    margin: 10,
    marginBottom: 0,
  },
  text2: {
    fontFamily: 'Oxygen-Regular',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  imageContainer: {
    resizeMode: 'center',
  },
  button: {
    margin: 10,
  },
  solidButton: {
    marginTop: 20,
    backgroundColor: '#fff',
  },
});

export default WelcomePage;
