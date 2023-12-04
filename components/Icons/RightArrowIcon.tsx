import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const RightArrowIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="21" height="22" viewBox="0 0 21 22" fill="none" {...props}>
      <G id="Iconsax/Linear/arrowsquaredown">
        <Path
          id="Vector"
          d="M9 14.5L13.0784 10.41L9 6.32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};
