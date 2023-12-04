import React from "react";
import { Svg, Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const CalendarIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="21" height="22" viewBox="0 0 21 22" fill="none" {...props}>
      <Path
        d="M7 2.25V4.875M14 2.25V4.875M3.0625 8.45375H17.9375M18.375 7.9375V15.375C18.375 18 17.0625 19.75 14 19.75H7C3.9375 19.75 2.625 18 2.625 15.375V7.9375C2.625 5.3125 3.9375 3.5625 7 3.5625H14C17.0625 3.5625 18.375 5.3125 18.375 7.9375Z"
        stroke="#FF077E"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.7337 12.4844H13.7416M13.7337 15.1094H13.7416M10.4962 12.4844H10.5049M10.4962 15.1094H10.5049M7.25781 12.4844H7.26656M7.25781 15.1094H7.26656"
        stroke="#FF077E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
