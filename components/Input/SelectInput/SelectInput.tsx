import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Select, ISelectProps } from "native-base";
import { ISelectItemProps } from "native-base/lib/typescript/components/primitives/Select/types";
import { Color } from "../../../GlobalStyles";
import { styles } from "./styles";
import { Platform, Text, View } from "react-native";

type SelectInputProps = ISelectProps & {
  label?: string;
  options: Array<ISelectItemProps>;
};

export const SelectInput: React.FC<SelectInputProps> = ({
  options,
  label,
  style,
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
        _actionSheet={{
          useRNModal: Platform.OS === "ios",
        }}
        dropdownCloseIcon={
          <AntDesign
            name="down"
            size={15}
            style={{
              right: 20,
              color: Color.primaryPink,
            }}
          />
        }
        dropdownOpenIcon={
          <AntDesign
            name="down"
            size={15}
            style={{
              right: 20,
              color: Color.primaryPink,
            }}
          />
        }
      >
        {options.map((opt) => {
          return <Select.Item key={opt.label} {...opt} />;
        })}
      </Select>
    </View>
  );
};
