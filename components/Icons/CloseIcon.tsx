import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const CloseIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" {...props}>
      <Path
        d="M2.08979 12.1011L0.976562 10.9878L5.42949 6.53491L0.976562 2.08198L2.08979 0.96875L6.54272 5.42168L10.9956 0.96875L12.1089 2.08198L7.65595 6.53491L12.1089 10.9878L10.9956 12.1011L6.54272 7.64814L2.08979 12.1011Z"
        fill="currentColor"
      />
    </Svg>
  );
};
