import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const BackIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="19" height="15" viewBox="0 0 19 15" fill="none" {...props}>
      <Path
        d="M7.07 1L1 7.07L7.07 13.14M18 7.07H1.17"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
