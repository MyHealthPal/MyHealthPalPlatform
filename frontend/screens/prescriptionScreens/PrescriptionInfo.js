import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MainContext } from "../../context/MainContext";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import CustomCard from "../../components/card/custom-card";
import IconBadge from "../../components/iconBadge/custom-iconBadge";
import CustomPopupAlert from "../../components/alerts/custom-popup-alert";
import {
  pluralize,
  humanDateString,
  humanTimeString,
} from "../../utils/string-utils";

const PrescriptionInfo = ({ route, navigation }) => {
  const { id } = route.params;
  const context = useContext(MainContext);

  const [prescriptionInfo, setPrescriptionInfo] = useState({});
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const getToken = () => {
    return SecureStore.getItemAsync("auth_token");
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleEdit = () => {
    navigation.navigate("AddUpdatePrescriptionRecords", {
      update: true,
      recordId: id,
    });
  };

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDelete(false);
    // Delete prescription api request and navigate back to prescription records page when finished
    let response;
    let json;
    // Delete vaccine api request and navigate back to vaccination records page when finished
    getToken().then(async (token) => {
      response = await fetch(context.fetchPath + "api/deletePrescription", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": token,
        },
        body: JSON.stringify({
          id,
        }),
      });

      json = await response.json();

      if (json.message === "Deleted prescription") {
        Toast.show({
          text1: `Success!`,
          text2: `Successfully deleted prescription record: ${prescriptionInfo.name}`,
          type: "success",
        });
        context.setUpdatePrescriptions(!context.updatePrescriptions);
        navigation.navigate("PrescriptionTracking");
      } else {
        Toast.show({
          text1: "Error",
          text2: json.message,
          type: "error",
        });
      }
    });
  };

  const pageContainerClass = "pageContainer" + capitalize(context.theme);

  const prescriptionDetailsOrder = [
    "name",
    "dosage",
    "number_of_doses",
    "start_date",
    "end_date",
    "frequency",
    "comments",
  ];

  const prescriptionDetailToIconMap = {
    name: { name: "medicinebox", library: "AntDesign" },
    dosage: { name: "eyedropper", library: "MaterialCommunityIcons" },
    number_of_doses: { name: "counter", library: "MaterialCommunityIcons" },
    start_date: { name: "clock-start", library: "MaterialCommunityIcons" },
    end_date: { name: "clock-end", library: "MaterialCommunityIcons" },
    frequency: { name: "repeat", library: "Feather" },
    comments: { name: "comments", library: "FontAwesome5" },
  };

  const fetchPrescriptionInfo = async () => {
    let response;
    let json;

    getToken().then(async (token) => {
      response = await fetch(context.fetchPath + `api/getPrescription/${id}`, {
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
        let {
          num_of_occurrences,
          occurrence_type,
          start_date,
          end_date,
          ...jsonNew
        } = json;
        start_date = new Date(Date.parse(start_date));
        end_date = new Date(Date.parse(end_date));
        setPrescriptionInfo({
          ...jsonNew,
          start_date:
            humanDateString(start_date) + "\n" + humanTimeString(start_date),
          end_date:
            humanDateString(end_date) + "\n" + humanTimeString(end_date),
          frequency: `Every ${json.num_of_occurrences} ${pluralize(
            json.occurrence_type,
            json.num_of_occurrences
          )}`,
        });
      }
    });
  };

  const renderPrescriptionInfo = ({ item, index }) => (
    <CustomCard
      outerStyle={[
        styles.prescriptionDetailsOuterContainer,
        index === 0 ? { marginTop: 16 } : {},
        index === prescriptionDetailsOrder.length - 1
          ? { marginBottom: 16 }
          : {},
      ]}
      innerStyle={styles.prescriptionDetailsInnerContainer}
      noTouchOpacity
    >
      <View style={styles.prescriptionDetailsIcon}>
        <IconBadge
          noTouchOpacity
          library={prescriptionDetailToIconMap[item.category]?.library ?? ""}
          icon={prescriptionDetailToIconMap[item.category]?.name ?? ""}
          size={45}
          color={context.theme === "dark" ? "#404040" : "#e0e0e0"}
        />
      </View>
      <View style={styles.prescriptionDetailsTextContainer}>
        <Text
          style={[
            styles.prescriptionDetailsTitle,
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
            styles.prescriptionDetailsValue,
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
    fetchPrescriptionInfo();
  }, []);

  useEffect(() => {
    if (prescriptionInfo) {
      navigation.setOptions({
        title: prescriptionInfo.name,
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
  }, [prescriptionInfo]);

  return (
    <View style={styles[pageContainerClass]}>
      <FlatList
        data={prescriptionDetailsOrder.map((prescriptionCategory, key) => ({
          id: key,
          category: prescriptionCategory,
          value: prescriptionInfo[prescriptionCategory],
        }))}
        renderItem={renderPrescriptionInfo}
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
  prescriptionDetailsOuterContainer: {
    marginVertical: 8,
    marginHorizontal: 20,
  },
  prescriptionDetailsInnerContainer: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  prescriptionDetailsTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1,
  },
  prescriptionDetailsTitle: {
    fontSize: 18,
    fontFamily: "Oxygen-Bold",
  },
  prescriptionDetailsValue: {
    fontSize: 18,
    fontFamily: "Oxygen-Regular",
  },
  prescriptionDetailsIcon: {
    marginRight: 20,
  },
});

export default PrescriptionInfo;
