import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Back from "../../assets/back.svg";

const VendorBackButton = ({ path, onPress, navigation, style = {} }) => {
  const { toggleDrawer, navigate } = useNavigation();
  // console.log("PATH", navigation.goBack);

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    if (path && navigation) {
      navigation.goBack();
      return;
    }

    toggleDrawer();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      hitSlop={20}
      // onPress={toggleDrawer}
      style={{ padding: 5, ...style }}
    >
      <Back />
    </TouchableOpacity>
  );
};

export default VendorBackButton;
