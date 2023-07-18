import * as React from "react";
import { Pressable } from "react-native";
import { CheckIcon } from "native-base";

const CheckBox = ({ checked, onPress, ...props }) => {
  return (
    <Pressable
      style={{
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: checked ? "#FFF" : "#FFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        backgroundColor: checked ? "#FF077E" : "#000",
        borderRadius: 4,
      }}
      onPress={onPress}
    >
      {checked ? <CheckIcon size={15} color={"#fff"} /> : <></>}
    </Pressable>
  );
};

export default CheckBox;
