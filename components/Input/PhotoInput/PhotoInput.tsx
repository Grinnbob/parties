import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import { CameraPlusIcon } from "../../Icons";
import { Color } from "../../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { selectedMediaAtom, SelectedMediaEnum } from "../../../stateManagement";
import { useRecoilState } from "recoil";

export type PhotoInputProps = {
  label: string;
  onChange: (uri: string) => void;
  value?: string;
  style?: StyleProp<ViewStyle>;
  isOptional?: boolean;
};

export const PhotoInput: React.FC<PhotoInputProps> = ({
  value,
  style,
  label,
  onChange,
  isOptional,
}) => {
  const navigation = useNavigation();
  const [selectedMedia, setSelectedMedia] = useRecoilState(selectedMediaAtom);

  useEffect(() => {
    if (selectedMedia[SelectedMediaEnum.PHOTO_INPUT]) {
      onChange(
        selectedMedia[SelectedMediaEnum.PHOTO_INPUT]?.[0]?.node.image.uri
      );
    }
  }, [selectedMedia[SelectedMediaEnum.PHOTO_INPUT], onChange]);

  const changeProfileBg = () => {
    console.log("navigation", navigation);
    navigation.push("CameraEdit", {
      key: SelectedMediaEnum.PHOTO_INPUT,
    });
  };

  useEffect(() => {}, []);

  return (
    <View style={[styles.root, style]}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {isOptional && <Text style={styles.optionalText}>(Optional)</Text>}
      </View>
      <View style={styles.content}>
        <ImageBackground
          source={value ? { uri: value } : undefined}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          imageStyle={{ borderRadius: 8 }}
        />
        <TouchableOpacity onPress={changeProfileBg}>
          <CameraPlusIcon color={Color.primaryPink} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
