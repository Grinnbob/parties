import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Back from "../../assets/back.svg";

const VendorBackButton = ({ path, navigation }) => {
  const { toggleDrawer, navigate } = useNavigation();
  console.log("PATH", navigation.goBack);
  return (
    <TouchableOpacity
      onPress={path ? navigation.goBack() : toggleDrawer}
      hitSlop={20}
      // onPress={toggleDrawer}
      style={{ padding: 5 }}
    >
      <Back />
    </TouchableOpacity>
  );
};

export default VendorBackButton;
