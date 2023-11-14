import React from "react";
import { Svg, Circle, SvgProps } from "react-native-svg";

export const SliderRightThumb: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Circle
        cx="12"
        cy="12"
        r="11"
        fill="#6C1B9E"
        stroke="white"
        strokeWidth="2"
      />
    </Svg>
  );
};
