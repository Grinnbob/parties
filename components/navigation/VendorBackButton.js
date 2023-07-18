import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Back from "../../assets/back.svg";

const VendorBackButton = ({ path }) => {
  const { toggleDrawer, navigate } = useNavigation();

  return (
    <TouchableOpacity
      //   onPress={path ? () => navigate(path.path, path.options) : toggleDrawer}
      onPress={toggleDrawer}
      style={{ padding: 5 }}
    >
      <Back />
    </TouchableOpacity>
  );
};

export default VendorBackButton;
