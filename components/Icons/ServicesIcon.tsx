import React from "react";
import Svg, { Path, G } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const ServicesIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <G id="Iconsax/Linear/baghappy">
        <Path
          id="Vector"
          d="M8.79437 14.25C8.79437 16.17 10.3744 17.75 12.2944 17.75C14.2144 17.75 15.7944 16.17 15.7944 14.25M9.10438 2L5.48438 5.63M15.4844 2L19.1044 5.63"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Vector_2"
          d="M2.29688 7.85156C2.29688 6.00156 3.28687 5.85156 4.51687 5.85156H20.0769C21.3069 5.85156 22.2969 6.00156 22.2969 7.85156C22.2969 10.0016 21.3069 9.85156 20.0769 9.85156H4.51687C3.28687 9.85156 2.29688 10.0016 2.29688 7.85156Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <Path
          id="Vector_3"
          d="M3.79688 10L5.20687 18.64C5.52687 20.58 6.29687 22 9.15687 22H15.1869C18.2969 22 18.7569 20.64 19.1169 18.76L20.7969 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};
