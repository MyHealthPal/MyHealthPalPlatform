import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomCard from "../../components/card/custom-card";
import { MainContext } from "../../context/MainContext";
import CustomHeader from "../../components/header/custom-header";
import { Dimensions } from "react-native";
import CustomInputBox from "../../components/inputBox/custom-inputBox";
import IconBadge from "../../components/iconBadge/custom-iconBadge";
const VaccinationRecords = () => {
  const [searchedValue, setSearchedValue] = useState("");

  const context = useContext(MainContext);

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const containerClass = "container" + capitalize(context.theme);

  const text1Class = "text1" + capitalize(context.theme);
  const text2Class = "text2" + capitalize(context.theme);
  return (
    <ScrollView style={[styles.container, styles[containerClass]]}>
      {/* <View style={styles.upperContainer}>
            <CustomHeader>Vaccines</CustomHeader>
          </View> */}
      <View style={styles.wrapper}>
        {/* <View style={styles.searchContainer}>
            <CustomInputBox
              placeholder="Search"
              value={searchedValue}
              onChange={setSearchedValue}
            />
          </View> */}
        <CustomCard
          outerStyle={styles.feature}
          innerStyle={styles.innerView}
          // onPress={() => navigation.navigate("")}
        >
          <View style={styles.innerContainer}>
            <View style={styles.textWrapper}>
              <View style={styles.iconWrapper}>
                <IconBadge
                  noTouchOpacity={true}
                  color={"#FC3636"}
                  size={30}
                  icon={"needle"}
                />
              </View>
              <Text
                style={[styles.text1, styles[text1Class], { color: "#FC3636" }]}
              >
                Vaccine Name
              </Text>
            </View>

            <View style={styles.textWrapper}>
              <View style={styles.iconWrapper}>
                <IconBadge
                  noTouchOpacity={true}
                  color={"#7E7E7E"}
                  size={30}
                  icon={"calendar-month-outline"}
                />
              </View>
              <Text style={[styles.text2, styles[text2Class]]}>
                Vaccination Date
              </Text>
            </View>
          </View>
        </CustomCard>

        <CustomCard
          outerStyle={styles.feature}
          innerStyle={styles.innerView}
          // onPress={() => navigation.navigate("")}
        >
          <View style={styles.innerContainer}>
            <View style={styles.textWrapper}>
              <View style={styles.iconWrapper}>
                <IconBadge
                  noTouchOpacity={true}
                  color={"#FC3636"}
                  size={30}
                  icon={"needle"}
                />
              </View>
              <Text
                style={[styles.text1, styles[text1Class], { color: "#FC3636" }]}
              >
                Vaccine Name
              </Text>
            </View>

            <View style={styles.textWrapper}>
              <View style={styles.iconWrapper}>
                <IconBadge
                  noTouchOpacity={true}
                  color={"#7E7E7E"}
                  size={30}
                  icon={"calendar-month-outline"}
                />
              </View>
              <Text style={[styles.text2, styles[text2Class]]}>
                Vaccination Date
              </Text>
            </View>
          </View>
        </CustomCard>

        <CustomCard
          outerStyle={styles.feature}
          innerStyle={styles.innerView}
          // onPress={() => navigation.navigate("")}
        >
          <View style={styles.innerContainer}>
            <View style={styles.textWrapper}>
              <View style={styles.iconWrapper}>
                <IconBadge
                  noTouchOpacity={true}
                  color={"#FC3636"}
                  size={30}
                  icon={"needle"}
                />
              </View>
              <Text
                style={[styles.text1, styles[text1Class], { color: "#FC3636" }]}
              >
                Vaccine Name
              </Text>
            </View>

            <View style={styles.textWrapper}>
              <View style={styles.iconWrapper}>
                <IconBadge
                  noTouchOpacity={true}
                  color={"#7E7E7E"}
                  size={30}
                  icon={"calendar-month-outline"}
                />
              </View>
              <Text style={[styles.text2, styles[text2Class]]}>
                Vaccination Date
              </Text>
            </View>
          </View>
        </CustomCard>

        <CustomCard
          outerStyle={styles.feature}
          innerStyle={styles.innerView}
          // onPress={() => navigation.navigate("")}
        >
          <View style={styles.innerContainer}>
            <View style={styles.textWrapper}>
              <View style={styles.iconWrapper}>
                <IconBadge
                  noTouchOpacity={true}
                  color={"#FC3636"}
                  size={30}
                  icon={"needle"}
                />
              </View>
              <Text
                style={[styles.text1, styles[text1Class], { color: "#FC3636" }]}
              >
                Vaccine Name
              </Text>
            </View>

            <View style={styles.textWrapper}>
              <View style={styles.iconWrapper}>
                <IconBadge
                  noTouchOpacity={true}
                  color={"#7E7E7E"}
                  size={30}
                  icon={"calendar-month-outline"}
                />
              </View>
              <Text style={[styles.text2, styles[text2Class]]}>
                Vaccination Date
              </Text>
            </View>
          </View>
        </CustomCard>
        {/* <CustomCard
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
          </CustomCard> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: 20,
  },
  upperContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flex: 1,
    margin: 10,
  },
  searchContainer: {
    width: "100%",
    marginVertical: 20,
  },
  vaccineDetailsContainer: {
    padding: 20,
  },
  feature: {
    marginVertical: 10,
    width: "100%",
    height: 100,
  },
  innerView: {
    alignItems: "flex-start",
  },
  iconWrapper: { marginRight: 15 },
  text1: {
    fontFamily: "Oxygen-Bold",
    fontSize: 20,
  },
  text2: {
    fontFamily: "Oxygen-Regular",
    fontSize: 14,
  },
  text1Dark: {
    color: "#ffffff",
  },
  text1Light: {
    color: "#212121",
  },
  text2Dark: {
    color: "#d1d1d1",
  },
  text2Light: {
    color: "#7E7E7E",
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    padding: 15,
  },
  textWrapper: {
    // backgroundColor: "#EEE",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default VaccinationRecords;
