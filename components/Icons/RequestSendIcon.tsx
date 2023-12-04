import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const RequestSendIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="70" height="70" viewBox="0 0 70 70" fill="none" {...props}>
      <Path
        d="M28.0689 41.0506L41.1955 27.8872M18.1322 14.1739L49.2622 3.79723C63.2322 -0.859434 70.8222 6.76723 66.2022 20.7372L55.8255 51.8672C48.8589 72.8039 37.4189 72.8039 30.4522 51.8672L27.3722 42.6272L18.1322 39.5472C-2.80448 32.5806 -2.80448 21.1772 18.1322 14.1739Z"
        stroke="#FF077E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
