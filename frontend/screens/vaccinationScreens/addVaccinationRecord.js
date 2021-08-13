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
import Toast from "react-native-toast-message";

const AddUpdateVaccinationRecords = ({ update, recordId }) => {
  const token =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlMDVlZmMyNTM2YjJjZTdjNTExZjRiMTcyN2I4NTkyYTc5ZWJiN2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXktaGVhbHRoLXBhbC1kZjQxYSIsImF1ZCI6Im15LWhlYWx0aC1wYWwtZGY0MWEiLCJhdXRoX3RpbWUiOjE2Mjg4MjQ3OTEsInVzZXJfaWQiOiJ4UzZNTXV5WENDWTVlR05tS2RvZnRrY3B6MjMzIiwic3ViIjoieFM2TU11eVhDQ1k1ZUdObUtkb2Z0a2NwejIzMyIsImlhdCI6MTYyODgyNDc5MSwiZXhwIjoxNjI4ODI4MzkxLCJlbWFpbCI6InJpc2hhbnJhdG5hQGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsicmlzaGFucmF0bmFAaG90bWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.FBwx0-OgIK0LWoNHTW-WU7_vl6osb6cbKCrT8_acNB5R-c_AlK2TFXsrVrz0sEDRDILKBdq400OZsztxghoyWU2dYCLCPsgTXRBuhrWT0KnEoug6kQMC4dcBCrorSOHbybpV7v6S5DegNwEGJWOhy133zI89NUyG1CEA7-6kP46E0wO5XfnbLG0d8zTA_tWpCkBX8TVvUDpynLAxBD54Ucz-RdNy4obWh1Ip5mqLgeMPCEeuZ9TIRwmTtbR74flNjqyg-5i0s10cx0E1xMOcWXtZf2dVyGjlafKGqtIjrjdIlhkPfZpQTQP7D9_fEJczMgfbqPgs-bm1Dac1w0vZJQ";
  const context = useContext(MainContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [vaccineData, setVaccineData] = useState({
    agent: "",
    date_of_dose: undefined,
    diluent_product: "",
    dosage: "",
    dose: "",
    id: "",
    lot: "",
    organization: "",
    product_name: "",
    route: "",
    site: "",
    image: "",
  });

  useEffect(() => {
    if (update) {
      fetchVaccineDetails();
    } else {
      console.log("New Data");
    }
  }, []);

  const fetchVaccineDetails = async () => {
    let response;
    response = await fetch(context.fetchPath + "api/getVaccine/" + recordId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-tokens": token,
      },
    });

    let json = await response.json();
    if (json.message) {
      Toast.show({
        text1: "Error",
        text2: json.message,
        type: "error",
      });
    } else {
      setVaccineData(toString(json));
    }
    function toString(o) {
      Object.keys(o).forEach((k) => {
        if (typeof o[k] === "object") {
          return toString(o[k]);
        }

        o[k] = "" + o[k];
      });

      return o;
    }
  };

  const onChange = (value, key) => {
    let temp = vaccineData;
    temp[key] = value.toString();
    console.log(temp);
    setVaccineData({ ...temp });
  };

  const addUpdate = () => {
    console.log("Backend Call");
    console.log(vaccineData);
  };

  const goBack = () => {
    console.log("Go Back");
  };

  const getUTCDateFormat = (date) => {
    let todayUTC = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return todayUTC.toISOString().slice(0, 10);
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
                  <View pointerEvents="none">
                    <CustomInputBox
                      field="Date of Dose"
                      placeholder="Select the date of dose"
                      value={vaccineData["date_of_dose"] ?? ""}
                      onChange={setVaccineData}
                      containerStyling={{ marginVertical: 20 }}
                    />
                  </View>
                </TouchableOpacity>
              );
            } else if (key == "id") {
              return <></>;
            } else {
              return (
                <CustomInputBox
                  key={key}
                  field={key
                    .split("_")
                    .map((word) => capitalize(word))
                    .join(" ")}
                  placeholder={"Enter the " + key.split("_").join(" ")}
                  value={vaccineData[key]}
                  onChange={(value) => {
                    onChange(value, key);
                  }}
                  containerStyling={{ marginVertical: 20 }}
                />
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
        date={vaccineData.date_Of_Dose}
        mode="date"
        onConfirm={(date) => {
          onChange(getUTCDateFormat(date), "date_of_dose");
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
