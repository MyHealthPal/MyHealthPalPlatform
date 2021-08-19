import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MainContext } from "../../context/MainContext";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import CustomCard from "../../components/card/custom-card";
import IconBadge from "../../components/iconBadge/custom-iconBadge";
import CustomPopupAlert from "../../components/alerts/custom-popup-alert";
import { humanDateString } from "../../utils/string-utils";

const VaccinationInfo = ({ route, navigation }) => {
  const { id } = route.params;
  const context = useContext(MainContext);

  const [vaccineInfo, setVaccineInfo] = useState({});
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const getToken = () => {
    return SecureStore.getItemAsync("auth_token");
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleEdit = () => {
    navigation.navigate("AddUpdateVaccinationRecords", {
      update: true,
      recordId: id,
    });
  };

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDelete(false);
    // Delete vaccine api request and navigate back to vaccination records page when finished
  };

  const pageContainerClass = "pageContainer" + capitalize(context.theme);

  const vaccineDetailsOrder = [
    "date_of_dose",
    "agent",
    "product_name",
    "diluent_product",
    "lot",
    "dosage",
    "route",
    "site",
    "dose",
    "organization",
  ];

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

  const fetchVaccineInfo = async () => {
    let response;
    let json;

    getToken().then(async (token) => {
      response = await fetch(context.fetchPath + `api/getVaccine/${id}`, {
        method: "GET",
        headers: {
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
        setVaccineInfo({
          ...json,
          date_of_dose: humanDateString(new Date(json.date_of_dose)),
        });
      }
    });
  };

  const renderVaccineInfo = ({ item, index }) => (
    <CustomCard
      outerStyle={[
        styles.vaccineDetailsOuterContainer,
        index === 0 ? { marginTop: 16 } : {},
        index === vaccineDetailsOrder.length - 1 ? { marginBottom: 16 } : {},
      ]}
      innerStyle={styles.vaccineDetailsInnerContainer}
      noTouchOpacity
    >
      <View style={styles.vaccineDetailsIcon}>
        <IconBadge
          noTouchOpacity
          library={vaccineDetailToIconMap[item.category]?.library ?? ""}
          icon={vaccineDetailToIconMap[item.category]?.name ?? ""}
          size={45}
          color={context.theme === "dark" ? "#404040" : "#e0e0e0"}
        />
      </View>
      <View style={styles.vaccineDetailsTextContainer}>
        <Text
          style={[
            styles.vaccineDetailsTitle,
            context.theme === "dark"
              ? { color: "#ffffff" }
              : { color: "#212121" },
          ]}
        >
          {item.category
            .split("_")
            .map((word) => capitalize(word))
            .join(" ")}
        </Text>
        <Text
          style={[
            styles.vaccineDetailsValue,
            context.theme === "dark"
              ? { color: "#d4d4d4" }
              : { color: "#606060" },
          ]}
        >
          {item.value}
        </Text>
      </View>
    </CustomCard>
  );

  useEffect(() => {
    fetchVaccineInfo();
  }, []);

  useEffect(() => {
    if (vaccineInfo) {
      navigation.setOptions({
        title: vaccineInfo.agent,
        headerRight: () => (
          <View style={styles.headerActions}>
            <IconBadge
              library="FontAwesome5"
              icon="edit"
              size={25}
              color="#ffffff"
              style={styles.headerButton}
              onPress={handleEdit}
            />
            <IconBadge
              library="FontAwesome5"
              icon="trash-alt"
              size={25}
              color="#ffffff"
              style={styles.headerButton}
              onPress={handleDelete}
            />
          </View>
        ),
      });
    }
  }, [vaccineInfo]);

  return (
    <View style={styles[pageContainerClass]}>
      <FlatList
        data={vaccineDetailsOrder.map((vaccineCategory, key) => ({
          id: key,
          category: vaccineCategory,
          value: vaccineInfo[vaccineCategory],
        }))}
        renderItem={renderVaccineInfo}
        keyExtractor={(item) => item.id.toString()}
      />
      <CustomPopupAlert
        open={showConfirmDelete}
        color={"#FC3636"}
        icon={"trash-alt"}
        iconLibrary={"FontAwesome5"}
        iconSize={40}
        title="Confirm Delete"
        description="Are you sure you want to delete this record?"
        buttons={[
          {
            text: "Cancel",
            type: "outlined",
            onPress: () => setShowConfirmDelete(false),
          },
          {
            text: "Delete",
            type: "regular",
            backgroundColor: "#FC3636",
            onPress: handleConfirmDelete,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainerLight: {
    backgroundColor: "#F8F8F8",
    height: "100%",
  },
  pageContainerDark: {
    backgroundColor: "#000000",
    height: "100%",
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
  vaccineDetailsOuterContainer: {
    marginVertical: 8,
    marginHorizontal: 20,
  },
  vaccineDetailsInnerContainer: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  vaccineDetailsTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1,
  },
  vaccineDetailsTitle: {
    fontSize: 18,
    fontFamily: "Oxygen-Bold",
  },
  vaccineDetailsValue: {
    fontSize: 18,
    fontFamily: "Oxygen-Regular",
  },
  vaccineDetailsIcon: {
    marginRight: 20,
  },
});

export default VaccinationInfo;
