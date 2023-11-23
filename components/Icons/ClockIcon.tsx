import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const ClockIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <G id="Iconsax/Linear/clock" clip-path="url(#clip0_209_18197)">
        <Path
          id="Vector"
          d="M18.3385 9.9974C18.3385 14.5974 14.6052 18.3307 10.0052 18.3307C5.40521 18.3307 1.67188 14.5974 1.67188 9.9974C1.67188 5.3974 5.40521 1.66406 10.0052 1.66406C14.6052 1.66406 18.3385 5.3974 18.3385 9.9974Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Vector_2"
          d="M13.0875 12.6495L10.5042 11.1078C10.0542 10.8411 9.6875 10.1995 9.6875 9.67448V6.25781"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_209_18197">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
