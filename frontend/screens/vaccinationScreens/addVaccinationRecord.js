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
import Toast from "react-native-toast-message";

const AddUpdateVaccinationRecords = ({ update, recordId }) => {
  const token =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM2NGU4NTQ1NzI5OWQ5NzIxYjczNDQyZGNiNTQ3Y2U2ZDk4NGRmNTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXktaGVhbHRoLXBhbC1kZjQxYSIsImF1ZCI6Im15LWhlYWx0aC1wYWwtZGY0MWEiLCJhdXRoX3RpbWUiOjE2MjkwNzQ5NzEsInVzZXJfaWQiOiJ4UzZNTXV5WENDWTVlR05tS2RvZnRrY3B6MjMzIiwic3ViIjoieFM2TU11eVhDQ1k1ZUdObUtkb2Z0a2NwejIzMyIsImlhdCI6MTYyOTA3NDk3MSwiZXhwIjoxNjI5MDc4NTcxLCJlbWFpbCI6InJpc2hhbnJhdG5hQGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsicmlzaGFucmF0bmFAaG90bWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.FSUq__5dhukERV3Zq_TdiKdqHRYNavsfibbOUL7RnL0x2jDhiPds8pARGQFaItwDpHR7Iet-UWztRoP0lZMSO_roVukYBWutC_lZdKM1a1mKzDs0Q3kV5bm0A5kZ7iT992AsMMM38EyPNoLom15wRa1oLH6MmAHd9LY6vpVSJj_FdxvWij0rlmYZB6_sF0DbMT2no6UgmYwwRkTzIg9A6YRFuH-z2MbAfIF8R11L_0zPTaB7Ubm9A3JW7R5_1GkQp8cCJu5HoHyXJAgRqMk-QqY12vF6e-YQvFoKRH41_MWyYhyenRhNXyrHe_HajvY3EC-PRcaynL-YfIkdmQKvVw";
  const context = useContext(MainContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [vaccineData, setVaccineData] = useState({
    agent: "",
    date_of_dose: "2021-10-06",
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
    date_of_dose: { name: "calendar-alt", library: "FontAwesome5" },
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

  const fetchVaccineDetails = async () => {
    //GET TOKEN
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
    setVaccineData({ ...temp });
  };

  const addUpdate = async () => {
    //validation REQUIRED FIELDS
    //GET TOKEN
    if (update) {
      let response;
      let json;
      response = await fetch(context.fetchPath + "api/updateVaccine", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": token,
        },
        body: JSON.stringify(vaccineData),
      });

      json = await response.json();
    } else {
      let response;
      let json;
      response = await fetch(context.fetchPath + "api/addVaccine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": token,
        },
        body: JSON.stringify(vaccineData),
      });

      json = await response.json();
    }
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
                      value={vaccineData["date_of_dose"] ?? ""}
                      onChange={setVaccineData}
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
