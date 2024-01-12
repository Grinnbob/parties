import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const PlusIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="9" height="10" viewBox="0 0 9 10" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.25 1.51562C5.25 1.10141 4.91421 0.765625 4.5 0.765625C4.08579 0.765625 3.75 1.10141 3.75 1.51562V4.51562H0.75C0.335786 4.51562 0 4.85141 0 5.26562C0 5.67984 0.335786 6.01562 0.75 6.01562H3.75V9.01562C3.75 9.42984 4.08579 9.76562 4.5 9.76562C4.91421 9.76562 5.25 9.42984 5.25 9.01562V6.01562H8.25C8.66421 6.01562 9 5.67984 9 5.26562C9 4.85141 8.66421 4.51562 8.25 4.51562H5.25V1.51562Z"
        fill="currentColor"
      />
    </Svg>
  );
};
