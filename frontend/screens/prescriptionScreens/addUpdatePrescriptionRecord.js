import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
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
import CustomDropdown from "../../components/dropdown/custom-dropdown";

import {
  pluralize,
  humanDateString,
  humanTimeString,
} from "../../utils/string-utils";

const AddUpdatePrescriptionRecords = ({ route, navigation }) => {
  const { update, recordId } = route.params;
  const context = useContext(MainContext);
  const [showDatePickerStart, setShowDatePickerStart] = useState(false);
  const [showDatePickerEnd, setShowDatePickerEnd] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({});

  const prescriptionDetailToIconMap = {
    name: { name: "medicinebox", library: "AntDesign" },
    dosage: { name: "eyedropper", library: "MaterialCommunityIcons" },
    number_of_doses: { name: "counter", library: "MaterialCommunityIcons" },
    start_date: { name: "clock-start", library: "MaterialCommunityIcons" },
    end_date: { name: "clock-end", library: "MaterialCommunityIcons" },
    num_of_occurrences: { name: "counter", library: "MaterialCommunityIcons" },
    occurrence_type: { name: "repeat", library: "Feather" },
    comments: { name: "comments", library: "FontAwesome5" },
  };
  const occurrenceTypes = [
    { id: "day", title: "Daily" },
    { id: "week", title: "Weekly" },
    { id: "month", title: "Monthly" },
    { id: "year", title: "Yearly" },
  ];
  useLayoutEffect(() => {
    if (update) {
      fetchPrescriptionDetails();
    } else {
      setPrescriptionData({
        id: "",
        name: "",
        dosage: "",
        number_of_doses: "",
        start_date: new Date(),
        end_date: new Date(),
        num_of_occurrences: "",
        occurrence_type: "",
        comments: "",
        //image: "",
      });
    }
  }, []);

  useEffect(() => {
    if (prescriptionData) {
      navigation.setOptions({
        title: `${update ? "Update" : "Add"} Prescription`,
      });
    }
  }, [prescriptionData]);

  const getToken = () => {
    return SecureStore.getItemAsync("auth_token");
  };

  const fetchPrescriptionDetails = async () => {
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
      response = await fetch(
        context.fetchPath + "api/getPrescription/" + recordId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": token,
          },
        }
      );

      json = await response.json();
      if (json.message) {
        Toast.show({
          text1: "Error",
          text2: json.message,
          type: "error",
        });
      } else {
        let temp = toString(json);
        temp["start_date"] = new Date(json.start_date);
        temp["end_date"] = new Date(json.end_date);
        setPrescriptionData({ ...temp });
      }
    });
  };

  const onChange = (value, key) => {
    let temp = prescriptionData;
    temp[key] = value;
    setPrescriptionData({ ...temp });
  };

  const addUpdate = async () => {
    let response;
    let json;
    if (update) {
      getToken().then(async (token) => {
        response = await fetch(context.fetchPath + "api/updatePrescription", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": token,
          },
          body: JSON.stringify({
            ...prescriptionData,
            start_date: prescriptionData.start_date.toISOString(),
            end_date: prescriptionData.end_date.toISOString(),
          }),
        });

        json = await response.json();
        context.setUpdatePrescriptions(!context.updatePrescriptions);
      });
    } else {
      getToken().then(async (token) => {
        response = await fetch(context.fetchPath + "api/AddPrescription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": token,
          },
          body: JSON.stringify({
            ...prescriptionData,
            start_date: prescriptionData.start_date.toISOString(),
            end_date: prescriptionData.end_date.toISOString(),
          }),
        });

        json = await response.json();
        context.setUpdatePrescriptions(!context.updatePrescriptions);
      });
    }

    navigation.navigate("PrescriptionTracking");
    Toast.show({
      text1: "Success",
      text2: update
        ? "Your prescription info has been updated"
        : "Your prescription info has been added",
      type: "success",
    });
  };

  const goBack = () => {
    navigation.navigate("PrescriptionTracking");
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <ScrollView>
      <View style={styles[`${context.theme}Container`]}>
        <View style={[styles.wrapper]}>
          {Object.keys(prescriptionData).map((key) => {
            if (key == "start_date") {
              return (
                <TouchableOpacity
                  onPress={() => setShowDatePickerStart(true)}
                  style={{ width: "100%" }}
                >
                  <View style={styles.rowContainer} pointerEvents="none">
                    <IconBadge
                      noTouchOpacity
                      library={
                        prescriptionDetailToIconMap["start_date"]?.library ?? ""
                      }
                      icon={
                        prescriptionDetailToIconMap["start_date"]?.name ?? ""
                      }
                      size={45}
                      color={context.theme === "dark" ? "#404040" : "#e0e0e0"}
                    />
                    <CustomInputBox
                      field="Start Date"
                      placeholder="Select the Start Date"
                      value={
                        humanDateString(prescriptionData["start_date"]) +
                          " at " +
                          humanTimeString(prescriptionData["start_date"]) ?? ""
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
            } else if (key == "end_date") {
              return (
                <TouchableOpacity
                  onPress={() => setShowDatePickerEnd(true)}
                  style={{ width: "100%" }}
                >
                  <View style={styles.rowContainer} pointerEvents="none">
                    <IconBadge
                      noTouchOpacity
                      library={
                        prescriptionDetailToIconMap["end_date"]?.library ?? ""
                      }
                      icon={prescriptionDetailToIconMap["end_date"]?.name ?? ""}
                      size={45}
                      color={context.theme === "dark" ? "#404040" : "#e0e0e0"}
                    />
                    <CustomInputBox
                      field="End Date"
                      placeholder="Select the End Date"
                      value={
                        humanDateString(prescriptionData["end_date"]) +
                          " at " +
                          humanTimeString(prescriptionData["end_date"]) ?? ""
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
            } else if (key == "occurrence_type") {
              return (
                <View style={styles.rowContainer}>
                  <IconBadge
                    noTouchOpacity
                    library={prescriptionDetailToIconMap[key]?.library ?? ""}
                    icon={prescriptionDetailToIconMap[key]?.name ?? ""}
                    size={45}
                    color={context.theme === "dark" ? "#404040" : "#e0e0e0"}
                  />
                  <View style={{ flex: 1, marginVertical: 20, marginLeft: 20 }}>
                    {prescriptionData && (
                      <CustomDropdown
                        title={"Choose Occurrence Type..."}
                        // field={key
                        //   .split("_")
                        //   .map((word) => capitalize(word))
                        //   .join(" ")}
                        items={occurrenceTypes}
                        placeholder={"Select the " + key.split("_").join(" ")}
                        value={
                          occurrenceTypes.find(
                            (e) => e.id == prescriptionData[key]
                          )?.title ?? ""
                        }
                        onValueChange={(value) => {
                          onChange(value.id, key);
                        }}
                      />
                    )}
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.rowContainer}>
                  <IconBadge
                    noTouchOpacity
                    library={prescriptionDetailToIconMap[key]?.library ?? ""}
                    icon={prescriptionDetailToIconMap[key]?.name ?? ""}
                    size={45}
                    color={context.theme === "dark" ? "#404040" : "#e0e0e0"}
                  />
                  <CustomInputBox
                    key={key}
                    keyboardType={
                      key == "num_of_occurrences" || key == "number_of_doses"
                        ? "numeric"
                        : "default"
                    }
                    field={key
                      .split("_")
                      .map((word) => capitalize(word))
                      .join(" ")}
                    placeholder={"Enter the " + key.split("_").join(" ")}
                    value={prescriptionData[key]}
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
        isVisible={showDatePickerStart}
        date={prescriptionData.start_date}
        mode="datetime"
        onConfirm={(date) => {
          setShowDatePickerStart(false);
          onChange(date, "start_date");
        }}
        onCancel={() => setShowDatePickerStart(false)}
      />
      <DateTimePickerModal
        isVisible={showDatePickerEnd}
        date={prescriptionData.endDate}
        mode="datetime"
        onConfirm={(date) => {
          setShowDatePickerEnd(false);
          onChange(date, "end_date");
        }}
        onCancel={() => setShowDatePickerEnd(false)}
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

export default AddUpdatePrescriptionRecords;
