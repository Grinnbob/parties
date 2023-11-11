import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Padding } from "../../GlobalStyles";
import { useToast } from "native-base";
import Warning from "../../assets/warning.svg";
import MidGradientButton from "../../components/MidGradientButton";
import { BlurView } from "@react-native-community/blur";
import apis from "../../apis";
import StateTypes from "../../stateManagement/StateTypes";
import useGlobalState from "../../stateManagement/hook";
import Delete from "../../assets/deletecircle.svg";

export default ({ navigation }) => {
  const toast = useToast();
  const [token, setToken] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default
  );

  const userState = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );

  const user = userState[0];

  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    navigation.pop();
  };

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      const res = await apis.user.deleteById(user?.id);
      setIsLoading(false);
      if (res && res.success === false) {
        toast.show({
          placement: "top",
          description: res.message,
        });
        setIsLoading(false);
      }
      if (res && res.success) {
        await apis.device.deleteById(setToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BlurView blurAmount={1} blurType="dark" style={styles.blurContainer}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Warning />
            <Text style={styles.title}>
              Are you sure want to delete {"\n"}your account?
            </Text>
          </View>
          <View style={[styles.titleParent, styles.alertFlexBox]}>
            <Text style={styles.title2}>
              Keep in mind this action cannot be undone
            </Text>
          </View>
          <View style={styles.iconsaxlinearclosecircle}>
            <TouchableOpacity activeOpacity={0.2} onPress={handleNavigation}>
              <Delete />
            </TouchableOpacity>
          </View>
          <MidGradientButton
            label="Yes, delete my account"
            onPress={handleDeleteAccount}
            formBackgroundColor="rgba(255, 255, 255, 0.1)"
            formMarginTop="unset"
            labelColor="#FFF"
            width={297}
          />
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  alertFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  alertmodalLayout: {
    width: "100%",
    position: "absolute",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    minHeight: 201,
    maxHeight: 812,
    backgroundColor: "#F5F9FC",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 36,
    paddingBottom: 46,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alertmodal: {
    paddingHorizontal: Padding.p_13xl,
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  title: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "700",
    color: "#000000",
    textAlign: "left",
    marginLeft: 12,
  },
  title2: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "300",
    color: "#8A8A8A",
    width: "100%",
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  titleParent: {
    marginTop: 24,
  },
  iconsaxlinearclosecircle: {
    width: 24,
    height: 24,
    zIndex: 1,
    overflow: "hidden",
    position: "absolute",
    width: "100%",
    alignItems: "flex-end",
    marginTop: 8,
  },
});
