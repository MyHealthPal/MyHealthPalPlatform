import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import CustomCard from "../../components/card/custom-card";
import { MainContext } from "../../context/MainContext";
import IconBadge from "../../components/iconBadge/custom-iconBadge";
import * as SecureStore from "expo-secure-store";
import {
  pluralize,
  humanDateString,
  humanTimeString,
} from "../../utils/string-utils";

const PrescriptionTracking = ({ navigation }) => {
  const [prescriptionList, setPrescriptionList] = useState({});

  const context = useContext(MainContext);

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const containerClass = "container" + capitalize(context.theme);
  const text2Class = "text2" + capitalize(context.theme);

  const iconColor = context.theme == "dark" ? "#484848" : "#e0e0e0";

  const getToken = () => {
    return SecureStore.getItemAsync("auth_token");
  };

  const handleAddPrescription = () => {
    navigation.navigate("AddUpdatePrescriptionRecords", {
      update: false,
      recordId: "",
    });
  };

  const fetchPrescriptionList = async () => {
    let response;
    let json;

    getToken().then(async (token) => {
      response = await fetch(context.fetchPath + `api/getPrescriptionAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": token,
        },
      });

      json = await response.json();

      if (json.message) {
        Toast.show({
          text1: "Error",
          text2: json.message,
          type: "error",
        });
      } else {
        setPrescriptionList(json);
      }
    });
  };

  useEffect(() => {
    fetchPrescriptionList();
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerActions}>
          <IconBadge
            library="Feather"
            icon="file-plus"
            size={25}
            color="#ffffff"
            style={styles.headerButton}
            onPress={handleAddPrescription}
          />
        </View>
      ),
    });
  }, [context.updatePrescriptions]);

  return (
    <ScrollView style={[styles.container, styles[containerClass]]}>
      <View style={styles.wrapper}>
        {Object.keys(prescriptionList).map((key) => {
          return (
            <CustomCard
              outerStyle={styles.outterCardStyling}
              onPress={() =>
                navigation.navigate("PrescriptionInfo", {
                  id: prescriptionList[key]["id"],
                })
              }
            >
              <View style={styles.innerContainer}>
                <View style={styles.textWrapper}>
                  <View style={styles.iconWrapper}>
                    <IconBadge
                      library="AntDesign"
                      noTouchOpacity={true}
                      color={"#ff8d4f"}
                      size={30}
                      icon={"medicinebox"}
                    />
                  </View>
                  <Text style={styles.text1}>
                    {prescriptionList[key]["name"]}
                  </Text>
                </View>
                <View style={styles.textWrapper}>
                  <View style={styles.iconWrapper}>
                    <IconBadge
                      library="MaterialCommunityIcons"
                      noTouchOpacity={true}
                      color={iconColor}
                      size={30}
                      icon={"counter"}
                    />
                  </View>
                  <Text style={[styles.text2, styles[text2Class]]}>
                    {prescriptionList[key]["number_of_doses"]}{" "}
                    {pluralize(
                      "dose",
                      prescriptionList[key]["number_of_doses"]
                    )}
                  </Text>
                </View>
                <View style={styles.textWrapper}>
                  <View style={styles.iconWrapper}>
                    <IconBadge
                      library="Feather"
                      noTouchOpacity={true}
                      color={iconColor}
                      size={30}
                      icon={"repeat"}
                    />
                  </View>
                  <Text style={[styles.text2, styles[text2Class]]}>
                    Every {prescriptionList[key]["num_of_occurrences"]}{" "}
                    {pluralize(
                      prescriptionList[key]["occurrence_type"],
                      prescriptionList[key]["num_of_occurrences"]
                    )}
                  </Text>
                </View>
              </View>
            </CustomCard>
          );
        })}
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
  headerActions: {
    marginRight: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerButton: {
    marginHorizontal: 8,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 20,
  },
  outterCardStyling: {
    marginVertical: 10,
    width: "100%",
  },
  iconWrapper: { marginRight: 15 },
  text1: {
    color: "#ff8d4f",
    fontFamily: "Oxygen-Bold",
    fontSize: 20,
  },
  text2: {
    fontFamily: "Oxygen-Regular",
    fontSize: 15,
  },
  text2Dark: {
    color: "#d1d1d1",
  },
  text2Light: {
    color: "#7e7e7e",
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    padding: 15,
  },
  textWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PrescriptionTracking;
