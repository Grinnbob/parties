import React from "react";
import { Svg, Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const CheckCircleIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
        fill="#FF077E"
      />
      <Path
        d="M7.75 12.0019L10.58 14.8319L16.25 9.17188"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
