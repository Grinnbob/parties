import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Select, ISelectProps } from "native-base";
import { ISelectItemProps } from "native-base/lib/typescript/components/primitives/Select/types";
import { Color } from "../../../GlobalStyles";
import { styles } from "./styles";
import { Platform, StyleProp, Text, TextStyle, View } from "react-native";

type SelectInputProps = ISelectProps & {
  label?: string;
  options: Array<ISelectItemProps>;
  arrowIconStyle?: StyleProp<TextStyle>;
};

export const SelectInput: React.FC<SelectInputProps> = ({
  options,
  label,
  style,
  arrowIconStyle,
  ...rest
}) => {
  return (
    <View>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <Select
        {...rest}
        borderRadius={8}
        borderColor="rgba(255, 255, 255, 0.2)"
        fontSize={16}
        minHeight={54}
        lineHeight={22}
        style={[styles.root, style]}
        paddingLeft={6}
        paddingBottom={3}
        _actionSheet={{
          useRNModal: Platform.OS === "ios",
        }}
        _actionSheetContent={{ bg: "rgba(29, 26, 31, 1)" }}
        _item={{
          bg: "rgba(29, 26, 31, 1)",
          _text: { color: Color.textMainWhite },
        }}
        _selectedItem={{ bg: "rgba(29, 26, 31, 1)" }}
        color={Color.textMainWhite}
        dropdownCloseIcon={
          <View style={[styles.arrowIconContainer, arrowIconStyle]}>
            <AntDesign name="down" size={15} style={styles.arrowIcon} />
          </View>
        }
        dropdownOpenIcon={
          <View style={[styles.arrowIconContainer, arrowIconStyle]}>
            <AntDesign name="down" size={15} style={styles.arrowIcon} />
          </View>
        }
      >
        {options.map((opt) => {
          return <Select.Item key={opt.label} {...opt} />;
        })}
      </Select>
    </View>
  );
};
