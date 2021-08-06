import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomCard from "../../components/card/custom-card";
import { MainContext } from "../../context/MainContext";
import CustomHeader from "../../components/header/custom-header";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInputBox from "../../components/inputBox/custom-inputBox";

const VaccinationRecords = () => {
  const [searchedValue, setSearchedValue] = useState("");

  const context = useContext(MainContext);

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const containerClass = "container" + capitalize(context.theme);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.container, styles[containerClass]]}>
          <View style={styles.upperContainer}>
            <CustomHeader>Vaccines</CustomHeader>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.searchContainer}>
              <CustomInputBox
                placeholder="Search"
                value={searchedValue}
                onChange={setSearchedValue}
              />
            </View>
            <CustomCard
              outerStyle={styles.feature}
              innerStyle={styles.innerView}
              // onPress={() => navigation.navigate("")}
            >
              <View style={[styles.vaccineDetailsContainer]}>
                <Text style={[styles.vaccineHeader]}>Vaccine Name</Text>
                <Text style={[styles.subtitle]}>Vaccination Date</Text>
              </View>
            </CustomCard>
            <CustomCard
              outerStyle={styles.feature}
              innerStyle={styles.innerView}
              // onPress={() => navigation.navigate("")}
            >
              <View style={[styles.vaccineDetailsContainer]}>
                <Text style={[styles.vaccineHeader]}>Vaccine Name</Text>
                <Text style={[styles.subtitle]}>Vaccination Date</Text>
              </View>
            </CustomCard>
            <CustomCard
              outerStyle={styles.feature}
              innerStyle={styles.innerView}
              // onPress={() => navigation.navigate("")}
            >
              <View style={[styles.vaccineDetailsContainer]}>
                <Text style={[styles.vaccineHeader]}>Vaccine Name</Text>
                <Text style={[styles.subtitle]}>Vaccination Date</Text>
              </View>
            </CustomCard>
            <CustomCard
              outerStyle={styles.feature}
              innerStyle={styles.innerView}
              // onPress={() => navigation.navigate("")}
            >
              <View style={[styles.vaccineDetailsContainer]}>
                <Text style={[styles.vaccineHeader]}>Vaccine Name</Text>
                <Text style={[styles.subtitle]}>Vaccination Date</Text>
              </View>
            </CustomCard>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  containerLight: {
    backgroundColor: "#F8F8F8",
  },
  containerDark: {
    backgroundColor: "#000000",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 20,
  },
  upperContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flex: 1,
  },
  searchContainer: {
    width: "100%",
    marginVertical: 20,
  },
  vaccineDetailsContainer: {
    padding: 20,
  },
  vaccineHeader: {
    fontSize: 24,
    fontFamily: "Oxygen-Regular",
    color: "#D1D1D1", //context based
    // paddingHorizontal: 20,
    // paddingTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Oxygen-Light",
    color: "#7E7E7E", //context based
    // paddingHorizontal: 10,
    // paddingBottom: 10,
  },
  feature: {
    //marginHorizontal:'2%',
    marginVertical: 10,
    width: "100%",
    height: 100,
  },
  innerView: {
    alignItems: "flex-start",
  },
  imageContainer: {},
});

export default VaccinationRecords;
