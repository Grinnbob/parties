import React from "react";

import MaskInput, { createNumberMask } from "react-native-mask-input";

const BasicMask = (props) => {
  return (
    <MaskInput
      {...props}
      style={{
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        borderRadius: 8,
        height: 48,
        fontSize: 16,
        width: "100%",
        paddingLeft: 10,
        alignSelf: "center",
        color: "#FFF",
        ...props.style,
      }}
    />
  );
};

export const PhoneMask = (props) => {
  return (
    <BasicMask
      placeholder="Enter Phone Number"
      placeholderTextColor="#8A8A8A"
      mask={[
        /\d/,
        /\d/,
        /\d/,
        " ",
        "-",
        " ",
        /\d/,
        /\d/,
        /\d/,
        " ",
        "-",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      {...props}
    />
  );
};

export const SSNMask = (props) => {
  return (
    <MaskInput
      mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      {...props}
    />
  );
};

export const SSNMaskLast4 = (props) => {
  return <MaskInput mask={[/\d/, /\d/, /\d/, /\d/]} {...props} />;
};

export const MoneyMask = (props) => {
  return (
    <BasicMask
      mask={createNumberMask({
        prefix: ["$"],
        delimiter: ",",
        separator: ".",
        precision: 2,
      })}
      {...props}
    />
  );
};

export const BasicMoneyMask = (props) => {
  return (
    <MaskInput
      mask={createNumberMask({
        prefix: ["$"],
        delimiter: ",",
        separator: ".",
        precision: 2,
      })}
      {...props}
    />
  );
};

export default BasicMask;
