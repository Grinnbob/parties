import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Back from "../../assets/back.svg";

const BackButton = ({ path }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={
        path
          ? () => navigation.navigate(path.path, path.options)
          : () => navigation.pop()
      }
      style={{ padding: 5 }}
      hitSlop={20}
    >
      <Back />
    </TouchableOpacity>
  );
};

export default BackButton;
