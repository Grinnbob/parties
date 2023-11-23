import React from "react";
import { Svg, Circle } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const SliderLeftThumb: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Circle
        cx="12"
        cy="12"
        r="11"
        fill="#FF077E"
        stroke="white"
        strokeWidth="2"
      />
    </Svg>
  );
};
