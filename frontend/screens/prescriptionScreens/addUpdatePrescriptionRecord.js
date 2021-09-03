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

const AddUpdatePrescriptionRecords = ({ route, navigation }) => {
  const { update, recordId } = route.params;
  const context = useContext(MainContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({
    id: "",
    name: "",
    dosage: "",
    number_of_doses: "",
    start_date: "",
    end_date: "",
    num_of_occurences: "",
    occurence_type: "",
    comments: "",
    //image: "",
  });

  const prescriptionDetailToIconMap = {
    name: { name: "medicinebox", library: "AntDesign" },
    dosage: { name: "eyedropper", library: "MaterialCommunityIcons" },
    number_of_doses: { name: "counter", library: "MaterialCommunityIcons" },
    start_date: { name: "clock-start", library: "MaterialCommunityIcons" },
    end_date: { name: "clock-end", library: "MaterialCommunityIcons" },
    frequency: { name: "repeat", library: "Feather" },
    comments: { name: "comments", library: "FontAwesome5" },
  };

  useEffect(() => {
    if (update) {
      fetchPrescriptionDetails();
    } else {
      console.log("New Data");
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
        setPrescriptionData(toString(json));
      }
    });
  };

  const onChange = (value, key) => {
    let temp = prescriptionData;
    temp[key] = value.toString();
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
          body: JSON.stringify(prescriptionData),
        });

        json = await response.json();
      });
    } else {
      getToken().then(async (token) => {
        response = await fetch(context.fetchPath + "api/AddPrescription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": getToken,
          },
          body: JSON.stringify(prescriptionData),
        });

        json = await response.json();
      });
    }
  };

  const goBack = () => {
    console.log("Go Back");
  };

  const getUTCDateFormat = (date) => {
    let todayUTC = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return todayUTC;
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <ScrollView>
      <View style={styles[`${context.theme}Container`]}>
        <View style={[styles.wrapper]}>
          {Object.keys(prescriptionData).map((key) => {
            if (key == "date_of_dose") {
              return (
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={{ width: "100%" }}
                >
                  <View style={styles.rowContainer} pointerEvents="none">
                    <IconBadge
                      noTouchOpacity
                      library={prescriptionData["date_of_dose"]?.library ?? ""}
                      icon={prescriptionData["date_of_dose"]?.name ?? ""}
                      size={45}
                      color={context.theme === "dark" ? "#404040" : "#e0e0e0"}
                    />
                    <CustomInputBox
                      field="Date of Dose"
                      placeholder="Select the date of dose"
                      value={prescriptionData["date_of_dose"] ?? ""}
                      onChange={setPrescriptionData}
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
                    library={prescriptionDetailToIconMap[key]?.library ?? ""}
                    icon={prescriptionDetailToIconMap[key]?.name ?? ""}
                    size={45}
                    color={context.theme === "dark" ? "#404040" : "#e0e0e0"}
                  />
                  <CustomInputBox
                    key={key}
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
        isVisible={showDatePicker}
        date={prescriptionData.date_Of_Dose}
        mode="date"
        onConfirm={(date) => {
          onChange(humanDateString(getUTCDateFormat(date)), "date_of_dose");
          setShowDatePicker(false);
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

export default AddUpdatePrescriptionRecord;
