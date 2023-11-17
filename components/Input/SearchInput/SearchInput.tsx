import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Input, IInputProps, Icon, View } from "native-base";
import { styles } from "./styles";

import MagnifyGlass from "../../../assets/magnifyGlassSearch.svg";
import Close from "../../../assets/closeSearch.svg";
import { Color } from "../../../GlobalStyles";

type SearchInputProps = IInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
};

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  const {
    placeholder = "Search",
    value,
    containerStyle,
    style,
    loading,
    ...rest
  } = props;

  const handleCancelPress = () => {
    props.onChangeText?.("");
  };

  return (
    <View style={[containerStyle]}>
      <Input
        placeholder={placeholder}
        style={[styles.root, style]}
        variant="searchBar"
        borderRadius="30"
        placeholderTextColor={Color.gray300}
        InputLeftElement={
          <View style={styles.leftIcon}>
            <Icon color="black" as={<MagnifyGlass />} />
          </View>
        }
        InputRightElement={
          <View style={styles.rightIcon}>
            {loading && (
              <ActivityIndicator style={styles.activityIndicator} size={10} />
            )}
            {value?.length > 0 ? (
              <Pressable onPress={handleCancelPress}>
                <Icon m="4" size="6" as={<Close />} />
              </Pressable>
            ) : undefined}
          </View>
        }
        value={value}
        {...rest}
      />
    </View>
  );
};

export default SearchInput;
