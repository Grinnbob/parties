import React, { useCallback, useState } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";
import {
  CheckCircleIcon,
  MoreVertIcon,
  PencilIcon,
  TrashIcon,
} from "../../../Icons";
import FastImage, { FastImageProps } from "react-native-fast-image";
import { Color } from "../../../../GlobalStyles";
import { Menu } from "../../../Atoms/Menu";

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
  actions?: {
    onDelete: () => void;
    onEdit: () => void;
  };
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
  actions,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prevState) => {
      return !prevState;
    });
  }, []);

  const handleEdit = useCallback(() => {
    toggleMenu();
    actions?.onEdit();
  }, [actions, toggleMenu]);

  const handleDelete = useCallback(() => {
    toggleMenu();
    actions?.onDelete();
  }, [actions, toggleMenu]);

  return (
    <TouchableOpacity
      style={[styles.root, style]}
      onPress={onPress}
      disabled={disabled || !onPress}
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
          colors={["#ff077e", "#ff077e"]}
          useAngle={true}
          angle={-90}
        >
          <Text style={styles.nameText}>{name}</Text>
          {!!actions && (
            <>
              <TouchableOpacity
                style={styles.moreVertIconContainer}
                onPress={toggleMenu}
              >
                <MoreVertIcon color={Color.textMainWhite} />
              </TouchableOpacity>
              <Menu
                opened={isMenuOpen}
                onBackdropPress={toggleMenu}
                options={[
                  {
                    children: (
                      <View style={styles.menuOption}>
                        <PencilIcon color={Color.textMainWhite} />
                        <Text
                          style={[
                            styles.menuText,
                            { color: Color.textMainWhite },
                          ]}
                        >
                          Edit
                        </Text>
                      </View>
                    ),
                    onSelect: handleEdit,
                    customStyles: {
                      optionWrapper: {
                        backgroundColor: Color.primaryPink,
                      },
                    },
                  },
                  {
                    children: (
                      <View style={styles.menuOption}>
                        <TrashIcon color={Color.primaryPink} />
                        <Text
                          style={[
                            styles.menuText,
                            { color: Color.labelColorLightPrimary },
                          ]}
                        >
                          Delete
                        </Text>
                      </View>
                    ),
                    onSelect: handleDelete,
                  },
                ]}
              />
            </>
          )}
        </LinearGradient>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      {!!image?.source?.uri && (
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
