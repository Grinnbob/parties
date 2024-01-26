import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const CheckIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="14" height="11" viewBox="0 0 14 11" fill="none" {...props}>
      <Path
        d="M1 5.69565L4.65217 9.34783L13 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
