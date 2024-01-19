import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const PencilIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M8.58171 20H4.69565C4.51115 20 4.33421 19.9267 4.20375 19.7963C4.07329 19.6658 4 19.4889 4 19.3044V15.4183C4.00009 15.234 4.07326 15.0574 4.20348 14.927L14.9269 4.20359C15.0573 4.07323 15.2342 4 15.4186 4C15.603 4 15.7799 4.07323 15.9104 4.20359L19.7964 8.08704C19.9268 8.21749 20 8.39436 20 8.57878C20 8.76319 19.9268 8.94007 19.7964 9.07051L9.07301 19.7965C8.94265 19.9267 8.76596 19.9999 8.58171 20Z"
        stroke="currentColor"
        strokeWidth="0.833333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.3438 6.78125L17.2133 11.6508"
        stroke="currentColor"
        strokeWidth="0.833333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.7853 9.21875L6.4375 17.5665"
        stroke="currentColor"
        strokeWidth="0.833333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.82771 19.9527L4.04688 15.1719"
        stroke="currentColor"
        strokeWidth="0.833333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
