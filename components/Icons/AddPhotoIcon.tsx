import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const AddPhotoIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="80" height="80" viewBox="0 0 80 80" fill="none" {...props}>
      <G clipPath="url(#clip0_1035_93456)">
        <Rect width="80" height="80" rx="40" fill="white" />
        <Path
          d="M59.8125 59.8125H19.1875C18.1101 59.8125 17.0767 59.3845 16.3149 58.6226C15.553 57.8608 15.125 56.8274 15.125 55.75V27.3125C15.125 26.2351 15.553 25.2017 16.3149 24.4399C17.0767 23.678 18.1101 23.25 19.1875 23.25H27.3125L31.375 17.1562H47.625L51.6875 23.25H59.8125C60.8899 23.25 61.9233 23.678 62.6851 24.4399C63.447 25.2017 63.875 26.2351 63.875 27.3125V55.75C63.875 56.8274 63.447 57.8608 62.6851 58.6226C61.9233 59.3845 60.8899 59.8125 59.8125 59.8125Z"
          fill="#FF077E"
          fillOpacity="0.2"
          stroke="#FF077E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M40 32.5V52.5"
          stroke="#FF077E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M30 42.5H50"
          stroke="#FF077E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1035_93456">
          <Rect width="80" height="80" rx="40" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
