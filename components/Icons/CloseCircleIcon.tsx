import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const CloseCircleIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
      <G id="Iconsax/Linear/closecircle">
        <Path
          id="Vector"
          opacity="0.2"
          d="M12 22.5664C17.5 22.5664 22 18.0664 22 12.5664C22 7.06641 17.5 2.56641 12 2.56641C6.5 2.56641 2 7.06641 2 12.5664C2 18.0664 6.5 22.5664 12 22.5664Z"
          stroke="#8A8A8A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Vector_2"
          d="M9.17188 15.3983L14.8319 9.73828M14.8319 15.3983L9.17188 9.73828"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};
