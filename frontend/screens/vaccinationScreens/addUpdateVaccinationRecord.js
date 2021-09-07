import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MainContext } from "../../context/MainContext";
import CustomHeader from "../../components/header/custom-header";
import CustomInputBox from "../../components/inputBox/custom-inputBox";
import CustomButton from "../../components/button/custom-button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IconBadge from "../../components/iconBadge/custom-iconBadge";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import {
  pluralize,
  humanDateString,
  humanTimeString,
} from "../../utils/string-utils";

const AddUpdateVaccinationRecords = ({ route, navigation }) => {
  const { update, recordId } = route.params;
  const context = useContext(MainContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [vaccineData, setVaccineData] = useState({
    date_of_dose: new Date(),
    agent: "",
    diluent_product: "",
    dosage: "",
    dose: "",
    id: "",
    lot: "",
    organization: "",
    product_name: "",
    route: "",
    site: "",
    //image: "",
  });

  const vaccineDetailToIconMap = {
    product_name: { name: "syringe", library: "FontAwesome5" },
    date_of_dose: {
      name: "calendar-month-outline",
      library: "MaterialCommunityIcons",
    },
    organization: { name: "organization", library: "SimpleLineIcons" },
    agent: { name: "virus", library: "FontAwesome5" },
    diluent_product: { name: "drop", library: "Entypo" },
    dosage: { name: "eyedropper", library: "MaterialCommunityIcons" },
    route: { name: "route", library: "FontAwesome5" },
    site: { name: "location-pin", library: "Entypo" },
    lot: { name: "pin", library: "Entypo" },
    dose: { name: "counter", library: "MaterialCommunityIcons" },
  };

  useEffect(() => {
    if (update) {
      fetchVaccineDetails();
    } else {
      console.log("New Data");
    }
  }, []);

  useEffect(() => {
    if (vaccineData) {
      navigation.setOptions({
        title: `${update ? "Update" : "Add"} Vaccine`,
      });
    }
  }, [vaccineData]);

  const getToken = () => {
    return SecureStore.getItemAsync("auth_token");
  };

  const fetchVaccineDetails = async () => {
    //GET TOKEN
    let response;
    let json;

    function toString(o) {
      Object.keys(o).forEach((k) => {
        if (typeof o[k] === "object") {
          return toString(o[k]);
        }

        o[k] = "" + o[k];
      });

      return o;
    }

    getToken().then(async (token) => {
      response = await fetch(context.fetchPath + "api/getVaccine/" + recordId, {
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
        let temp = toString(json);
        temp["date_of_dose"] = new Date(json.date_of_dose);
        setVaccineData({ ...temp });
      }
    });
  };

  const onChange = (value, key) => {
    let temp = vaccineData;
    temp[key] = value;
    setVaccineData({ ...temp });
  };

  const addUpdate = async () => {
    let response;
    let json;
    if (update) {
      getToken().then(async (token) => {
        response = await fetch(context.fetchPath + "api/updateVaccine", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": token,
          },
          body: JSON.stringify({
            ...vaccineData,
            date_of_dose: vaccineData.date_of_dose.toISOString(),
          }),
        });

        json = await response.json();
        context.setUpdateVaccines(!context.updateVaccines);
      });
    } else {
      getToken().then(async (token) => {
        response = await fetch(context.fetchPath + "api/addVaccine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": token,
          },
          body: JSON.stringify({
            ...vaccineData,
            date_of_dose: vaccineData.date_of_dose.toISOString(),
          }),
        });

        json = await response.json();
        context.setUpdateVaccines(!context.updateVaccines);
      });
    }

    navigation.navigate("VaccinationRecords");
    Toast.show({
      text1: "Success",
      text2: update
        ? "Your vaccine info has been updated"
        : "Your vaccine info has been added",
      type: "success",
    });
  };

  const goBack = () => {
    navigation.navigate("VaccinationRecords");
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <ScrollView>
      <View style={styles[`${context.theme}Container`]}>
        <View style={[styles.wrapper]}>
          {Object.keys(vaccineData).map((key) => {
            if (key == "date_of_dose") {
              return (
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={{ width: "100%" }}
                >
                  <View style={styles.rowContainer} pointerEvents="none">
                    <IconBadge
                      noTouchOpacity
                      library={
                        vaccineDetailToIconMap["date_of_dose"]?.library ?? ""
                      }
                      icon={vaccineDetailToIconMap["date_of_dose"]?.name ?? ""}
                      size={45}
                      color={context.theme === "dark" ? "#404040" : "#e0e0e0"}
                    />
                    <CustomInputBox
                      field="Date of Dose"
                      placeholder="Select the date of dose"
                      value={
                        humanDateString(vaccineData["date_of_dose"]) +
                          " at " +
                          humanTimeString(vaccineData["date_of_dose"]) ?? ""
                      }
                      containerStyling={{
                        flex: 1,
                        marginVertical: 20,
                        marginLeft: 20,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            } else if (key == "id") {
              return <></>;
            } else {
              return (
                <View style={styles.rowContainer}>
                  <IconBadge
                    noTouchOpacity
                    library={vaccineDetailToIconMap[key]?.library ?? ""}
                    icon={vaccineDetailToIconMap[key]?.name ?? ""}
                    size={45}
                    color={context.theme === "dark" ? "#404040" : "#e0e0e0"}
                  />
                  <CustomInputBox
                    key={key}
                    keyboardType={key == "dose" ? "numeric" : "default"}
                    field={key
                      .split("_")
                      .map((word) => capitalize(word))
                      .join(" ")}
                    placeholder={"Enter the " + key.split("_").join(" ")}
                    value={vaccineData[key]}
                    onChange={(value) => {
                      onChange(value, key);
                    }}
                    containerStyling={{
                      flex: 1,
                      marginVertical: 20,
                      marginLeft: 20,
                    }}
                  />
                </View>
              );
            }
          })}
        </View>
        <View style={[styles.submitWrapper]}>
          <View style={{ flex: 1, margin: 20 }}>
            <CustomButton
              type="emphasized"
              text={update ? "Update" : "Add"}
              textColor={"#27ae60"}
              outlineColor={"#27ae60"}
              onPress={addUpdate}
            />
          </View>
          <View style={{ flex: 1, margin: 20 }}>
            <CustomButton
              type="outlined"
              text="Cancel"
              textColor={context.theme == "light" ? "#000000" : "#FFFFFF"}
              onPress={goBack}
            />
          </View>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={showDatePicker}
        date={vaccineData.date_of_dose}
        mode="datetime"
        onConfirm={(date) => {
          setShowDatePicker(false);
          onChange(date, "date_of_dose");
        }}
        onCancel={() => setShowDatePicker(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  darkContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 20,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  submitWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AddUpdateVaccinationRecords;
