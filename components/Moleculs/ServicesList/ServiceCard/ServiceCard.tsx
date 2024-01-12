import React from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { CheckCircleIcon } from "../../../Icons";
import FastImage, { FastImageProps } from "react-native-fast-image";

type ServiceCardProps = {
  name: string;
  description: string;
  price: number;
  unit: string;
  style?: StyleProp<ViewStyle>;
  isSelected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  image?: FastImageProps;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  unit,
  price,
  description,
  style,
  isSelected,
  onPress,
  disabled,
  image,
}) => {
  return (
    <TouchableOpacity
      style={[styles.root, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.header}>
        <View style={styles.priceContainer}>
          <Text style={styles.startAtText}>Starting at</Text>
          <Text style={styles.priceValueContainer}>
            <Text style={styles.priceText}>${price} </Text>
            <Text style={styles.unitText}>/ {unit}</Text>
          </Text>
        </View>
        <LinearGradient
          style={styles.nameContainer}
          locations={[0, 1]}
          colors={["#6c1b9e", "#ff077e"]}
          useAngle={true}
          angle={-90}
        >
          <Text style={styles.nameText}>{name}</Text>
        </LinearGradient>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      {!!image && (
        <FastImage
          resizeMode="contain"
          {...image}
          style={[styles.image, image?.style]}
        />
      )}
      {isSelected && <CheckCircleIcon style={styles.checkIcon} />}
    </TouchableOpacity>
  );
};
