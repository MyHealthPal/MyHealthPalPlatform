import React, { useContext, useState } from 'react';
import { MainContext } from '../context/MainContext';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomCard from '../components/card/custom-card';
import CustomButton from '../components/button/custom-button';
import LoadingIndicator from '../components/loadingIndicator/loadingIndicator';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';
import IconBadge from '../components/iconBadge/custom-iconBadge';

const Profile = ({ navigation }) => {
  const context = useContext(MainContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);

    if (context.theme === 'dark') {
      context.setTheme('light');
    } else {
      context.setTheme('dark');
    }
  };

  const setToken = (token) => {
    return SecureStore.setItemAsync('auth_token', token);
  };

  //1. Get User Info -> firstname, lastname, email, healthcard

  //2. handleUpdate -> call the POST api, and stringifies all the states (firstname, lastname etc)
  //NOTE: email will not change, but it still needs to be passed
  //make sure when user tries to update that info, you set state it (e.g. setFirstName('new name')

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

  //3. Log out -> expire token

  return (
    <ScrollView>
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

            <View style={styles.userInfoContainer}>
              <Text style={styles.username} numberOfLines={1}>
                Bruce Banner
              </Text>
              <Text style={styles.email} numberOfLines={1}>
                batman@DC.com
              </Text>
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
          <View style={styles.headerWrapper}>
            <View style={styles.iconWrapper}>
              <IconBadge
                library="Feather"
                noTouchOpacity={true}
                color={'#7E7E7E'}
                size={25}
                icon={'user'}
              />
            </View>
            <Text
              style={[
                styles.header,
                context.theme === 'dark'
                  ? { color: '#ffffff' }
                  : { color: '#212121' },
              ]}
            >
              Profile Info
            </Text>
          </View>

          {/* Profile Info Card */}
          <CustomCard
            outerStyle={styles.infoCardOuter}
            innerStyle={styles.infoCardInner}
            noTouchOpacity
          >
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => {
                // open modal to edit value
              }}
            >
              <Text
                style={[
                  styles.infoType,
                  context.theme === 'dark'
                    ? { color: '#D1D1D1' }
                    : { color: '#212121' },
                ]}
              >
                First Name
              </Text>
              <View style={styles.rightInfoContainer}>
                <Text style={styles.infoValue} numberOfLines={2}>
                  Bruce
                </Text>
                <IconBadge
                  library="AntDesign"
                  noTouchOpacity={true}
                  color={'#9e9e9e'}
                  size={15}
                  icon={'right'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => {
                // open modal to edit value
              }}
            >
              <Text
                style={[
                  styles.infoType,
                  context.theme === 'dark'
                    ? { color: '#D1D1D1' }
                    : { color: '#212121' },
                ]}
              >
                Last Name
              </Text>
              <View style={styles.rightInfoContainer}>
                <Text style={styles.infoValue} numberOfLines={2}>
                  Banner
                </Text>
                <IconBadge
                  library="AntDesign"
                  noTouchOpacity={true}
                  color={'#9e9e9e'}
                  size={15}
                  icon={'right'}
                />
              </View>
            </TouchableOpacity>
            <View
              style={styles.infoContainer}
              onPress={() => {
                // open modal to edit value
              }}
            >
              <Text
                style={[
                  styles.infoType,
                  context.theme === 'dark'
                    ? { color: '#D1D1D1' }
                    : { color: '#212121' },
                ]}
              >
                Email
              </Text>
              <View style={styles.rightInfoContainer}>
                <Text style={styles.infoValue} numberOfLines={2}>
                  batman@DC.com
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => {
                // open modal to edit value
              }}
            >
              <Text
                style={[
                  styles.infoType,
                  context.theme === 'dark'
                    ? { color: '#D1D1D1' }
                    : { color: '#212121' },
                ]}
              >
                Date of Birth
              </Text>
              <View style={styles.rightInfoContainer}>
                <Text style={styles.infoValue} numberOfLines={2}>
                  2020-07-01
                </Text>
                <IconBadge
                  library="AntDesign"
                  noTouchOpacity={true}
                  color={'#9e9e9e'}
                  size={15}
                  icon={'right'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.infoContainer, styles.lastItem]}
              onPress={() => {
                // open modal to edit value
              }}
            >
              <Text
                style={[
                  styles.infoType,
                  context.theme === 'dark'
                    ? { color: '#D1D1D1' }
                    : { color: '#212121' },
                ]}
              >
                Health Card
              </Text>
              <View style={styles.rightInfoContainer}>
                <Text style={styles.infoValue} numberOfLines={2}>
                  111-222-333
                </Text>
                <IconBadge
                  library="AntDesign"
                  noTouchOpacity={true}
                  color={'#9e9e9e'}
                  size={15}
                  icon={'right'}
                />
              </View>
            </TouchableOpacity>
          </CustomCard>

          <View style={styles.headerWrapper}>
            <View style={styles.iconWrapper}>
              <IconBadge
                library="Feather"
                noTouchOpacity={true}
                color={'#7E7E7E'}
                size={22}
                icon={'settings'}
              />
            </View>
            <Text
              style={[
                styles.header,
                context.theme === 'dark'
                  ? { color: '#ffffff' }
                  : { color: '#212121' },
              ]}
            >
              Settings
            </Text>
          </View>

          {/* Settings Card */}
          <CustomCard
            outerStyle={styles.infoCardOuter}
            innerStyle={styles.infoCardInner}
            noTouchOpacity
          >
            <View style={styles.settingsContainer}>
              <View style={styles.settingsLeftContainer}>
                <View style={styles.iconWrapper}>
                  <IconBadge
                    library="FontAwesome"
                    noTouchOpacity={true}
                    color={'#7E7E7E'}
                    size={22}
                    icon={'moon-o'}
                  />
                </View>
                <Text
                  style={[
                    styles.settingsType,
                    context.theme === 'dark'
                      ? { color: '#D1D1D1' }
                      : { color: '#212121' },
                  ]}
                >
                  Dark Mode
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#9e9e9e', true: '#ff8d4f' }}
                thumbColor={isEnabled ? '#ff5722' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </CustomCard>

          <View style={styles.buttonContainer}>
            <CustomButton
              type="emphasized"
              text="Log Out"
              textColor="#ff8d4f"
              additionalStyling={styles.logOutButton}
              //log out
              onPress={() => {}}
            />
          </View>
        </CustomCard>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  userInfoContainer: {
    flex: 3,
    marginLeft: 20,
  },
  profileImage: {
    flex: 1,
    width: 80,
    height: 80,
    borderRadius: 100,
    overflow: 'hidden',
  },
  username: {
    color: '#fff',
    fontWeight: '200',
    fontSize: 24,
    fontFamily: 'Oxygen-Bold',
  },
  email: {
    color: '#e0e0e0',
    fontSize: 16,
    marginTop: 8,
    fontFamily: 'Oxygen-Regular',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  header: {
    fontSize: 20,
    fontFamily: 'Oxygen-Bold',
    marginVertical: 10,
  },
  upperContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
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
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  lowerInnerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: 400,
  },
  infoContainer: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#e0e0e0',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  profileContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCardOuter: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 15,
  },
  iconWrapper: { marginRight: 15 },
  headerWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  infoCardInner: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  infoType: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#7E7E7E',
    marginRight: 8,
  },
  rightInfoContainer: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    width: '100%',
  },
  settingsContainer: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsLeftContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  logOutButton: {
    marginVertical: 20,
    marginHorizontal: 60,
  },
});

export default Profile;
