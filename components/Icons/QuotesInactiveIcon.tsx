import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const QuotesInactiveIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="20" height="23" viewBox="0 0 20 23" fill="none" {...props}>
      <Path
        d="M19 6.26562V16.2656C19 19.2656 17.5 21.2656 14 21.2656H6C2.5 21.2656 1 19.2656 1 16.2656V6.26562C1 3.26562 2.5 1.26562 6 1.26562H14C17.5 1.26562 19 3.26562 19 6.26562Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 3.76562V5.76562C12.5 6.86563 13.4 7.76562 14.5 7.76562H16.5M6 12.2656H10M6 16.2656H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
