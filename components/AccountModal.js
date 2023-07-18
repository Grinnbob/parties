import * as React from "react";
import { Image, StyleSheet, Text, View, Modal } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AccountUpdatedModel from "./AccountUpdatedModel";
import { FontFamily, Color, Padding, FontSize, Border } from "../GlobalStyles";

const AccountModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[styles.alertmodal, styles.alertmodalLayout]}>
        <AccountUpdatedModel />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  alertmodalLayout: {
    width: "100%",
    position: "absolute",
  },
  alertmodal: {
    backgroundColor: Color.gray_900,
    paddingHorizontal: Padding.p_13xl,
    paddingTop: Padding.p_13xl,
    paddingBottom: Padding.p_109xl,
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    top: 0,
    height: "100%",
  },
});

export default AccountModal;
