import React, { useEffect } from "react";
import { Pressable } from "react-native";

import { Input, Icon } from "native-base";

import useDebounce from "../../utils/useDebounce";
import MagnifyGlass from "../../assets/magnifyGlassSearch.svg";
import Close from "../../assets/closeSearch.svg";

const SearchBar = (props) => {
  const {
    placeholder = "Search",
    onDebounce = () => {},
    value,
    delay = 100,
    cancelEnabled = true,
    onCancel,
    ...rest
  } = props;

  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <Input
      placeholder={placeholder}
      width="95%"
      variant="searchBar"
      borderRadius="30"
      color={"#FFF"}
      py="1"
      px="2"
      mt={5}
      size="lg"
      InputLeftElement={
        <Icon m="4" mr="3" size="6" color="black" as={<MagnifyGlass />} />
      }
      InputRightElement={
        cancelEnabled && (
          <Pressable onPress={onCancel}>
            <Icon
              m="4"
              size="6"
              color={value.length > 0 ? "danger.700" : "gray.300"}
              as={<Close />}
            />
          </Pressable>
        )
      }
      value={value}
      {...rest}
    />
  );
};

export default SearchBar;
