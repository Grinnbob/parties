import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  Padding,
} from "../../GlobalStyles";
import Check from "../../assets/gradientcheck.svg";

const UploadModal = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("Photo");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[styles.alertmodal, styles.alertmodalLayout]}>
        <View style={[styles.alert, styles.alertFlexBox]}>
          <View style={[styles.content, styles.alertFlexBox]}>
            <Check />
            <View style={[styles.titleParent, styles.alertFlexBox]}>
              <Text style={styles.title}>Successfuly Uploaded</Text>
            </View>
          </View>
          <View style={styles.iconsaxlinearclosecircle}>
            <TouchableOpacity
              style={styles.vector}
              activeOpacity={0.2}
              onPress={handleNavigation}
            >
              <Image
                style={[styles.icon1, styles.iconLayout]}
                resizeMode="cover"
                source={require("../../assets/iconsaxlinearclosecircle1.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  alertFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  alertmodalLayout: {
    width: "100%",
    position: "absolute",
  },
  alertmodal: {
    paddingHorizontal: Padding.p_13xl,
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: "400",
    fontFamily: FontFamily.typographyBodySmallBold,
    color: Color.labelColorDarkPrimary,
    width: "100%",
    textAlign: "center",
  },
  titleParent: {
    marginTop: 24,
  },
  content: {
    alignSelf: "stretch",
    zIndex: 0,
  },
  icon1: {
    height: "100%",
    width: "100%",
  },
  vector: {
    left: "5.21%",
    top: "5.21%",
    right: "5.21%",
    bottom: "5.21%",
    width: "89.58%",
    height: "89.58%",
    position: "absolute",
  },
  iconsaxlinearclosecircle: {
    top: 8,
    left: 295,
    width: 24,
    height: 24,
    zIndex: 1,
    overflow: "hidden",
    position: "absolute",
  },
  alert: {
    borderRadius: 20,
    backgroundColor: "#1D1A1F",
    shadowColor: "rgba(27, 27, 27, 0.16)",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
    elevation: 16,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "rgba(27, 27, 27, 0.16)",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_13xl,
    height: 256,
  },
});

export default UploadModal;
