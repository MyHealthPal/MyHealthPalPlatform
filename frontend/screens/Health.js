import React, {useContext} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomCard from '../components/card/custom-card';
import { MainContext } from '../context/MainContext';
import CustomHeader from '../components/header/custom-header';
import { Dimensions } from 'react-native';

const Health = ({navigation}) => {
    const context = useContext(MainContext);
    return (
      <ScrollView>
        <View style={styles.container}>
           <View style={[styles.wrapper]}>
           <CustomCard outerStyle={[styles.feature]} innerStyle={{height:'100%'}}> 
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={context.gradient}
                style={{borderRadius:10, width:'100%', height: '100%', padding: 10}}
              >              
                <CustomHeader additionalStyles={{color:'#ffffff'}}>
                  Main
                </CustomHeader>         
              </LinearGradient>
           </CustomCard>
          
            <CustomCard outerStyle={styles.feature} innerStyle={styles.innerView} onPress={()=>navigation.navigate('VaccinationRecords')}>
              <Text style={[styles.header]}>
                Vaccination Records
              </Text>
              <Text style={[styles.subtitle]}>
                Vaccination Record Details
              </Text>
            </CustomCard>
            <CustomCard outerStyle={styles.feature} innerStyle={styles.innerView}  onPress={()=>navigation.navigate('VisionTest')}>
              <Text style={[styles.header]}>
                Vision Test
              </Text>
              <Text style={[styles.subtitle]}>
                Vision Test Description
              </Text>
            </CustomCard>
            <CustomCard outerStyle={styles.feature} innerStyle={styles.innerView} onPress={()=>navigation.navigate('PrecriptionTracking')}>
              <Text style={[styles.header]}>
                Prescription Tracking
              </Text>
              <Text style={[styles.subtitle]}>
                Dosage Details
              </Text>
            </CustomCard>
            <CustomCard outerStyle={styles.feature} innerStyle={styles.innerView}  onPress={()=>console.log('test')}>
              <Text style={[styles.header]}>
                Next Card
              </Text>
              <Text style={[styles.subtitle]}  onPress={()=>console.log('test')}>
                Subtitle Card
              </Text>
            </CustomCard>
           </View>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212121',//context based
    height: '100%',
    width: '100%',
  },
  wrapper:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20
  },
  header: {
    fontSize: 24,
    fontFamily:'Oxygen-Regular',
    color: '#D1D1D1', //context based
    paddingHorizontal: 10,
    paddingTop:10
  },
  subtitle: {
    fontSize: 16,
    fontFamily:'Oxygen-Light',
    color: '#7E7E7E', //context based
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  feature: {
    //marginHorizontal:'2%',
    marginVertical: 10,
    width: '100%',
    height: 150,
  },
  innerView:{
    alignItems:'flex-start',
  },
  imageContainer:{

  }
});

export default Health
