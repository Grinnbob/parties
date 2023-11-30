import React from "react";
import { SvgIconProps } from "../../types";
import Svg, { G, Path } from "react-native-svg";

export const QuoteSubmittedIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="43" height="44" viewBox="0 0 43 44" fill="none">
      <G id="quote send">
        <Path
          id="Vector"
          d="M19.5 32L23.5 28M23.5 28L19.5 24M23.5 28H11.5"
          stroke="#6C1B9E"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Vector_2"
          d="M41.5 18V28C41.5 38 37.5 42 27.5 42H15.5C5.5 42 1.5 38 1.5 28V16C1.5 6 5.5 2 15.5 2H25.5"
          stroke="#FF077E"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Vector_3"
          d="M41.5 18H33.5C27.5 18 25.5 16 25.5 10V2L41.5 18Z"
          stroke="#FF077E"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};
