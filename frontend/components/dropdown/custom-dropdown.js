import React, { useContext, useState } from "react";
import { MainContext } from "../../context/MainContext";
import {
  Text,
  View,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Triangle from "react-native-triangle";

const CustomDropdown = (props) => {
  const { placeholder, title, value, items, width, height, onValueChange } =
    props;

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const context = useContext(MainContext);

  const windowHeight = Dimensions.get("window").height;

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const renderItem = ({ item }) => {
    const modalButtonTextClass = "modalButtonText" + capitalize(context.theme);
    const modalButtonClass = "modalButton" + capitalize(context.theme);

    const onItemPress = () => {
      setSelectedValue(item.title);
      onValueChange(item);
      setOpen(false);
    };

    return (
      <TouchableOpacity
        onPress={onItemPress}
        style={[styles.modalButton, styles[modalButtonClass]]}
      >
        <Text
          style={[
            styles[modalButtonTextClass],
            styles.modalButtonText,
            item.title === selectedValue
              ? styles.modalButtonTextSelected
              : styles.modalButtonTextUnselected,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const dropdownClass = "dropdown" + capitalize(context.theme);
  const textClass = "text" + capitalize(context.theme);
  const modalContainerClass = "modalContainer" + capitalize(context.theme);
  const modalOptionsTitleClass =
    "modalOptionsTitle" + capitalize(context.theme);

  const dropDownModalClass = {
    body: {
      backgroundColor: context.theme === "dark" ? "#d1d1d1" : "#404040",
      borderTopRightRadius: 22,
      borderTopLeftRadius: 22,
    },
    titleBox: {
      backgroundColor: context.theme === "dark" ? "#404040" : "#d1d1d1",
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    titleText: {
      color: context.theme === "dark" ? "#d1d1d1" : "#404040",
      fontSize: 14,
    },
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setOpen(true);
        }}
      >
        <View
          style={[styles.dropdown, styles[dropdownClass], { width, height }]}
        >
          <Text style={[styles.text, styles[textClass]]}>
            {!!selectedValue ? selectedValue : placeholder}
          </Text>
          <Triangle
            width={14}
            height={8}
            color={context.theme === "dark" ? "#D1D1D1" : "#404040"}
            direction={open ? "up" : "down"}
          />
        </View>
      </TouchableWithoutFeedback>

      <Modal animationType={"fade"} transparent={true} visible={open}>
        <View style={styles.modalOverlay}></View>
      </Modal>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalTouchOutside}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        ></TouchableOpacity>
        <View
          style={[
            styles.modalContainer,
            styles[modalContainerClass],
            { maxHeight: 0.6 * windowHeight },
          ]}
        >
          <Text
            style={[
              title
                ? styles.modalOptionsTitle
                : styles.modalOptionsTitlePlaceholder,
              styles[modalOptionsTitleClass],
            ]}
          >
            {title}
          </Text>
          <FlatList
            style={styles.flatlistContainer}
            data={items}
            renderItem={renderItem}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Oxygen-Regular",
    fontSize: 16,
  },
  textDark: {
    color: "#d1d1d1",
  },
  textLight: {
    color: "#404040",
  },

  dropdown: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  dropdownDark: {
    backgroundColor: "#404040",
  },
  dropdownLight: {
    backgroundColor: "#F4F4F4",
  },
  flatlistContainer: {
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.4,
    backgroundColor: "#000",
  },
  modalTouchOutside: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },
  modalOptionsTitle: {
    fontSize: 16,
    fontFamily: "Oxygen-Regular",
    height: 50,
    paddingVertical: 12.5,
  },
  modalOptionTitlePlaceholder: {
    height: 25,
  },
  modalOptionsTitleDark: {
    color: "#b1b1b1",
  },
  modalOptionsTitleLight: {
    color: "#404040",
  },
  modalContainer: {
    width: "100%",
    left: 0,
    bottom: 0,
    position: "absolute",
    flex: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainerDark: {
    backgroundColor: "#212121",
  },
  modalContainerLight: {
    backgroundColor: "#ffffff",
  },
  modalButton: {
    height: 50,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderBottomWidth: 1,
  },
  modalButtonDark: {
    borderBottomColor: "#2e2e2e",
  },
  modalButtonLight: {
    borderBottomColor: "#e4e4e4",
  },
  modalButtonText: {
    fontSize: 18,
  },
  modalButtonTextUnselected: {
    fontFamily: "Oxygen-Regular",
  },
  modalButtonTextSelected: {
    fontFamily: "Oxygen-Bold",
  },
  modalButtonTextDark: {
    color: "#ffffff",
  },
  modalButtonTextLight: {
    color: "#212121",
  },
});

export default CustomDropdown;
