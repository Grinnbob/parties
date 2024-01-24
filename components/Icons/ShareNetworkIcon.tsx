import React from "react";
import { SvgIconProps } from "../../types";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export const ShareNetworkIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_1042_94356)">
        <Path
          d="M11.0769 19.0757C12.7763 19.0757 14.1538 17.6981 14.1538 15.9988C14.1538 14.2995 12.7763 12.9219 11.0769 12.9219C9.37759 12.9219 8 14.2995 8 15.9988C8 17.6981 9.37759 19.0757 11.0769 19.0757Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21.8465 26.0054C23.5458 26.0054 24.9234 24.6278 24.9234 22.9285C24.9234 21.2291 23.5458 19.8516 21.8465 19.8516C20.1471 19.8516 18.7695 21.2291 18.7695 22.9285C18.7695 24.6278 20.1471 26.0054 21.8465 26.0054Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21.8465 12.1538C23.5458 12.1538 24.9234 10.7763 24.9234 9.07692C24.9234 7.37759 23.5458 6 21.8465 6C20.1471 6 18.7695 7.37759 18.7695 9.07692C18.7695 10.7763 20.1471 12.1538 21.8465 12.1538Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19.2583 10.7422L13.6641 14.3383"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.6641 17.6641L19.2583 21.2602"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1042_94356">
          <Rect width="32" height="32" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
