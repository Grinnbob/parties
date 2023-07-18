import React from "react";
import { Pressable } from "react-native";
import { Text } from "native-base";
import LabelInput from "./LabelInput";
import Lock from "../../assets/lock.svg";
import Eye from "../../assets/eye.svg";
import CrossedEye from "../../assets/eyeslash.svg";

export default function PasswordInput(props) {
  const [show, setShow] = React.useState(false);
  return (
    <LabelInput
      type={show ? "text" : "password"}
      placeholder={"Password"}
      InputRightElement={
        <Pressable onPress={() => setShow((prev) => !prev)}>
          <Text style={{ fontWeight: "500", fontSize: 12, color: "#B3BFCB" }}>
            {show ? <CrossedEye /> : <Eye />}
          </Text>
        </Pressable>
      }
      LeftComponent={<Lock />}
      label="Password"
      secureTextEntry={!show}
      {...props}
    />
  );
}
