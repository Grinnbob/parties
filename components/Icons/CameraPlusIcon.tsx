import React from "react";
import { SvgIconProps } from "../../types";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export const CameraPlusIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="57" height="56" viewBox="0 0 57 56" fill="none" {...props}>
      <G clipPath="url(#clip0_1065_29864)">
        <Path
          d="M46 45.5H11C10.0717 45.5 9.1815 45.1312 8.52513 44.4749C7.86875 43.8185 7.5 42.9283 7.5 42V17.5C7.5 16.5717 7.86875 15.6815 8.52513 15.0251C9.1815 14.3687 10.0717 14 11 14H18L21.5 8.75H35.5L39 14H46C46.9283 14 47.8185 14.3687 48.4749 15.0251C49.1312 15.6815 49.5 16.5717 49.5 17.5V42C49.5 42.9283 49.1312 43.8185 48.4749 44.4749C47.8185 45.1312 46.9283 45.5 46 45.5Z"
          fill="#FF077E"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M28.5 22.75V36.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21.5 29.75H35.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1065_29864">
          <Rect
            width="56"
            height="56"
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
