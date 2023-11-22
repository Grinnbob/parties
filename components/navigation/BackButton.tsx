import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Back from "../../assets/back.svg";

type BackButtonProps = {
  onPress?: () => void;
};

export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.pop();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ padding: 5 }} hitSlop={20}>
      <Back />
    </TouchableOpacity>
  );
};
