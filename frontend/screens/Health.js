import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomCard from '../components/card/custom-card';
import { MainContext } from '../context/MainContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconBadge from '../components/iconBadge/custom-iconBadge';

const Health = ({ navigation }) => {
  const context = useContext(MainContext);

  const windowHeight = Dimensions.get('window').height;

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={context.gradient}
          style={styles.mainContainer}
        >
          <View style={styles.upperContainer}>
            <View style={styles.textWrapper}>
              <IconBadge
                library="MaterialCommunityIcons"
                noTouchOpacity={true}
                color={'#fff'}
                size={35}
                icon={'heart-pulse'}
              />
              <Text style={styles.title}>Health</Text>
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
            <CustomCard
              outerStyle={styles.infoCardOuter}
              innerStyle={styles.infoCardInner}
              onPress={() => navigation.navigate('VaccinationRecords')}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/vaccination-image.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.header,
                    context.theme === 'dark'
                      ? { color: '#ffffff' }
                      : { color: '#212121' },
                  ]}
                >
                  Vaccination Records
                </Text>
                <Text style={[styles.subtitle]}>
                  Manage your vaccine passports
                </Text>
              </View>
            </CustomCard>
            <CustomCard
              outerStyle={styles.infoCardOuter}
              innerStyle={styles.infoCardInner}
              onPress={() => navigation.navigate('PrescriptionTracking')}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/prescription-image.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.header,
                    context.theme === 'dark'
                      ? { color: '#ffffff' }
                      : { color: '#212121' },
                  ]}
                >
                  Prescription Tracker
                </Text>
                <Text style={[styles.subtitle]}>
                  Keep track of all your prescriptions
                </Text>
              </View>
            </CustomCard>
          </CustomCard>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  textWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Oxygen-Bold',
    color: '#fff',
    marginLeft: 20,
  },
  infoCardOuter: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
  },
  infoCardInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 225,
  },
  imageContainer: {
    flex: 3,
  },
  image: {
    height: 180,
    width: 180,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontFamily: 'Oxygen-Regular',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Oxygen-Regular',
    color: '#7E7E7E',
  },
  upperContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingVertical: 30,
    paddingHorizontal: 30,
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
    paddingHorizontal: 25,
  },
  lowerInnerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: 400,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
});

export default Health;
