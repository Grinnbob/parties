import React from "react";
import Svg, {
  Defs,
  G,
  Mask,
  LinearGradient,
  Path,
  Stop,
  Rect,
} from "react-native-svg";
import { SvgIconProps } from "../../types";

export const AddBusinessIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="48" height="48" viewBox="0 0 48 48" fill="none" {...props}>
      <Mask
        id="mask0_1042_93803"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="48"
        height="48"
      >
        <Rect width="48" height="48" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_1042_93803)">
        <Path
          d="M36.05 45.6969V39.6469H30.05V36.6469H36.05V30.6469H39.05V36.6469H45.05V39.6469H39.05V45.6969H36.05ZM5.5 39.6469V27.3969H3V24.3969L5.2 14.2969H34.7L37 24.6469V27.3969H34.55V35.1469H31.55V27.3969H21.3V39.6469H5.5ZM8.5 36.6469H18.3V27.3969H8.5V36.6469ZM5.2 11.2969V8.29688H34.8V11.2969H5.2Z"
          fill="url(#paint0_linear_1042_93803)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1042_93803"
          x1="45.05"
          y1="26.9969"
          x2="3"
          y2="26.9969"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.000464379" stopColor="#6C1B9E" />
          <Stop offset="1" stopColor="#FF077E" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
