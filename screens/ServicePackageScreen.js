import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { Padding, Border, FontFamily, FontSize, Color } from "../GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import { useToast, Select, VStack } from "native-base";
import apis from "../apis";
import MidGradientButton from "../components/MidGradientButton";
import TopNavigationContent from "../components/TopNavigationContent";
import Close from "../assets/x.svg";
import ServicePackageModal from "../components/ServicePackageModal";
import StateTypes from "../stateManagement/StateTypes";
import useGlobalState from "../stateManagement/hook";

const ServicePackageScreen = ({ navigation, route }) => {
  const toast = useToast();
  const [packageName, setPackageName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [allService, setAllService] = useState([]);
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [serveAmount, setServeAmount] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vendor, setVendor] = useGlobalState(
    StateTypes.vendor.key,
    StateTypes.vendor.default
  );

  const grabService = async () => {
    try {
      const res = await apis.serviceType.getAll();

      setAllService(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const res = await apis.service.create({
        name: packageName,
        type: serviceType,
        price: price,
        rate: rate,
        description: description,
        amount: serveAmount,
        VendorId: vendor[0].id,
      });
      setIsLoading(false);
      if (res && res.success === false) {
        toast.show({
          placement: "top",
          description: res.message,
        });
      }
      if (res && res.success) {
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    grabService();
  }, [route]);

  return (
    <>
      <ServicePackageModal
        modalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <ScrollView style={{ backgroundColor: Color.labelColorLightPrimary }}>
        <View style={styles.servicepackagescreen}>
          <Image
            style={styles.bgIcon}
            resizeMode="cover"
            source={require("../assets/bg3.png")}
          />
          <TopNavigationContent
            RightComponent={<Close />}
            LeftComponent={() =>
              navigation.navigate("Calendar", { screen: "Calendar" })
            }
          />
          <View style={styles.title}>
            <View>
              <Text style={styles.title1}>Service Package</Text>
              <Text style={styles.title2}>
                By filling your service information you can {"\n"}create your
                service package for hosts to {"\n"}find
              </Text>
            </View>
          </View>

          <View style={[styles.packagePosition]}>
            <View style={[styles.packageName]}>
              <TextInput
                style={[styles.form, styles.formBorder]}
                placeholder="Package Name"
                keyboardType="default"
                placeholderTextColor="#8a8a8a"
                value={packageName}
                onChangeText={setPackageName}
              />
              <Select
                selectedValue={serviceType}
                accessibilityLabel="Service Type"
                placeholder="Service Type"
                dropdownCloseIcon={
                  <AntDesign
                    name="down"
                    size={15}
                    style={{ right: 20, color: "#FF077E" }}
                  />
                }
                dropdownOpenIcon={
                  <AntDesign
                    name="down"
                    size={15}
                    style={{ right: 20, color: "#FF077E" }}
                  />
                }
                borderColor="rgba(255, 255, 255, 0.2)"
                borderWidth={1}
                borderRadius={8}
                variant="unstyled"
                marginTop={2}
                marginBottom={5}
                paddingLeft={6}
                color={"#FFF"}
                onValueChange={(itemValue) => setServiceType(itemValue)}
              >
                <Select.Item label="Food" value="food" />
                <Select.Item label="Bartending" value="bartend" />
                <Select.Item label="Party Rentals" value="party" />
              </Select>
            </View>
            <Text style={styles.estimateThisPackage}>
              Estimate This Package Price
            </Text>
            <View style={[styles.starting, styles.formSpaceBlock1]}>
              <Text style={styles.perTypo}>Starting at</Text>
              <TextInput
                style={[styles.form2, styles.formSpaceBlock]}
                placeholder="$--"
                placeholderTextColor="#8a8a8a"
                returnKeyType={"next"}
                keyboardType={"phone-pad"}
                value={price}
                onChangeText={setPrice}
              />
              <Text style={[styles.per, styles.perTypo]}>per</Text>
              <Select
                selectedValue={rate}
                accessibilityLabel="---"
                placeholder="---"
                dropdownCloseIcon={
                  <AntDesign
                    name="down"
                    size={15}
                    style={{ right: 20, color: "#FF077E" }}
                  />
                }
                dropdownOpenIcon={
                  <AntDesign
                    name="down"
                    size={15}
                    style={{ right: 20, color: "#FF077E" }}
                  />
                }
                borderColor="rgba(255, 255, 255, 0.2)"
                borderWidth={1}
                borderRadius={8}
                variant="unstyled"
                width={150}
                color={"#FFF"}
                onValueChange={(itemValue) => setRate(itemValue)}
              >
                <Select.Item label="Person" value="person" />
                <Select.Item label="Hour" value="hour" />
                <Select.Item label="Day" value="day" />
              </Select>
            </View>
            <TextInput
              style={[styles.form4, styles.formSpaceBlock1]}
              placeholder="Service Package Description"
              keyboardType="default"
              multiline={true}
              placeholderTextColor="#8a8a8a"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={[styles.form5, styles.formSpaceBlock1]}
              placeholder="Serves XX People"
              returnKeyType={"next"}
              keyboardType={"phone-pad"}
              placeholderTextColor="#8a8a8a"
              value={serveAmount}
              onChangeText={setServeAmount}
            />
          </View>
          <VStack
            style={{
              marginVertical: 40,
              alignItems: "center",
              marginBottom: 80,
            }}
          >
            <MidGradientButton
              onPress={handleSave}
              isLoading={isLoading}
              disabled={
                !price || !serveAmount || !rate || !packageName || !description
              }
              label="Save"
              formBackgroundColor="rgba(255, 255, 255, 0.1)"
              formMarginTop="unset"
              labelColor="#FFF"
            />
          </VStack>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  packagePosition: {
    marginTop: 10,
  },
  formBorder: {
    paddingVertical: Padding.p_base,
    borderRadius: Border.br_5xs,
    borderWidth: 1,
    borderColor: "rgba(138, 138, 138, 0.3)",
    borderStyle: "solid",
    width: "100%",
    paddingHorizontal: Padding.p_5xl,
  },
  formSpaceBlock1: {
    marginTop: 16,
    flexDirection: "row",
  },
  formSpaceBlock: {
    padding: Padding.p_base,
    marginLeft: 8,
    flexDirection: "row",
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    alignItems: "center",
  },
  perTypo: {
    lineHeight: 21,
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
    fontSize: 16,
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
  },
  accessoryPosition: {
    paddingBottom: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
    width: "100%",
  },
  backIconLayout: {
    height: 40,
    width: 40,
  },
  xIconLayout: {
    height: 24,
    width: 24,
    overflow: "hidden",
  },
  bgIcon: {
    top: 0,
    width: 665,
    height: 891,
    left: 0,
    position: "absolute",
  },
  title1: {
    fontSize: 28,
    fontFamily: FontFamily.textLargeBold,
    width: 327,
    color: Color.labelColorDarkPrimary,
    fontWeight: "700",
    textAlign: "left",
  },
  title2: {
    color: Color.primaryAlmostGrey,
    marginTop: 8,
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
    lineHeight: 22,
    fontSize: 16,
    width: 327,
    textAlign: "left",
  },
  title: {
    paddingBottom: Padding.p_5xl,
    paddingTop: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  form: {
    flexDirection: "row",
    // paddingVertical: Padding.p_base,
    borderRadius: Border.br_5xs,
    alignItems: "center",
    color: "#FFF",
    marginBottom: 5,
  },
  estimateThisPackage: {
    lineHeight: 24,
    fontFamily: FontFamily.typographyBodySmallBold,
    fontSize: 16,
    color: Color.labelColorDarkPrimary,
    fontWeight: "700",
  },
  form2: {
    marginLeft: 8,
    width: 80,
    borderWidth: 1,
    borderColor: "rgba(138, 138, 138, 0.3)",
    color: "#FFF",
  },
  per: {
    marginHorizontal: 8,
  },
  starting: {
    alignSelf: "stretch",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  form4: {
    height: 137,
    paddingVertical: Padding.p_base,
    borderRadius: Border.br_5xs,
    borderWidth: 1,
    borderColor: "rgba(138, 138, 138, 0.3)",
    borderStyle: "solid",
    width: "100%",
    paddingHorizontal: Padding.p_5xl,
    marginTop: 16,
    color: "#FFF",
    paddingTop: 20,
  },
  form5: {
    paddingVertical: Padding.p_base,
    borderRadius: Border.br_5xs,
    borderWidth: 1,
    borderColor: "rgba(138, 138, 138, 0.3)",
    borderStyle: "solid",
    width: "100%",
    paddingHorizontal: Padding.p_5xl,
    height: 54,
    marginTop: 16,
    alignItems: "center",
    color: "#FFF",
  },
  topnavigationContent: {
    width: "100%",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  servicepackagescreen: {
    backgroundColor: Color.labelColorLightPrimary,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flex: 1,
    padding: 20,
  },
});

export default ServicePackageScreen;
