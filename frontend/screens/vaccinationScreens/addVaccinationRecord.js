import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { MainContext } from '../../context/MainContext';
import CustomHeader from '../../components/header/custom-header';
import CustomInputBox from '../../components/inputBox/custom-inputBox';

const VaccinationRecords = () => {
  const context = useContext(MainContext);
  const [vaccineData, setVaccineData] = useState({
    dateOfDose:Date.now(), 
    agent:'', 
    productName:'',
    diluentProduct:'', 
    lot:'',
    dosage:'',
    route:'',
    site:'',
    dose:'',
    organization:'',
    image:''})

  useEffect(() => {

  },[]);

  return (
    <ScrollView>
      <View style={styles[`${context.theme}Container`]}>
        <View style={[styles.wrapper]}>
          <CustomHeader>Add Vaccination</CustomHeader>
          {Object.keys(vaccineData).map( (key) => {
            return(
              <CustomInputBox field={'Vaccine'}/>  
            );
          })}
               
        </View>
      </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#42a5f5',
  },
  darkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default VaccinationRecords;
