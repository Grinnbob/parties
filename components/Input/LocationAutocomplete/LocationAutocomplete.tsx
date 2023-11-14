import React, { useCallback, useRef, useState } from "react";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteProps,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";

import { styles } from "./styles";
import { Color } from "../../../GlobalStyles";
import Config from "react-native-config";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { LocationIcon } from "../../Icons";

const query = {
  key: Config.GOOGLE_MAP_KEY,
  language: "en",
};

type LocationAutocompleteProps = Omit<
  GooglePlacesAutocompleteProps,
  "query"
> & {
  value: string;
};

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  ...rest
}) => {
  const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
  const [isFocused, setIsFocuses] = useState(false);
  const handleFocus = () => {
    setIsFocuses(true);
  };

  const handleBlur = () => {
    setIsFocuses(false);
  };

  const handleClear = () => {
    if (ref.current) {
      ref.current?.clear();
    }
    // @ts-expect-error onChangeText exist
    rest?.textInputProps?.onChangeText("");
  };

  const renderRightButton = useCallback(() => {
    return (
      <View style={styles.actionsContainer}>
        {!!value && (
          <TouchableOpacity onPress={handleClear}>
            <AntDesign name="close" size={20} style={styles.clearIcon} />
          </TouchableOpacity>
        )}
        <LocationIcon />
      </View>
    );
  }, [value]);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      {...rest}
      listUnderlayColor="red"
      styles={{
        container: [
          styles.container,
          isFocused ? styles.containerFocused : undefined,
        ],
        textInput: [styles.textInput],
      }}
      textInputProps={{
        placeholderTextColor: Color.gray300,
        ...rest.textInputProps,
        onFocus: handleFocus,
        onBlur: handleBlur,
        value,
        clearButtonMode: "never",
      }}
      renderRightButton={renderRightButton}
      minLength={2}
      fetchDetails={true}
      query={query}
      onFail={(error) => console.error(error)}
    />
  );
};
