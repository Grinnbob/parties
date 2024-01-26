import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const ProfileIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        d="M14 8.26562H19M15 12.2656H19M17 16.2656H19M17 21.2656H7C3 21.2656 2 20.2656 2 16.2656V8.26562C2 4.26562 3 3.26562 7 3.26562H17C21 3.26562 22 4.26562 22 8.26562V16.2656C22 20.2656 21 21.2656 17 21.2656Z"
        stroke="currentColor"
        strokeWidth="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 16.5975C11.9327 15.8955 11.6219 15.2393 11.1214 14.7425C10.621 14.2457 9.96243 13.9397 9.26 13.8775C8.75457 13.8275 8.24543 13.8275 7.74 13.8775C7.03826 13.9415 6.38078 14.2482 5.88069 14.7446C5.3806 15.241 5.06918 15.8962 5 16.5975M8.5 11.5575C8.98004 11.5575 9.44042 11.3668 9.77986 11.0274C10.1193 10.6879 10.31 10.2275 10.31 9.7475C10.31 9.26746 10.1193 8.80708 9.77986 8.46764C9.44042 8.1282 8.98004 7.9375 8.5 7.9375C8.01996 7.9375 7.55958 8.1282 7.22014 8.46764C6.8807 8.80708 6.69 9.26746 6.69 9.7475C6.69 10.2275 6.8807 10.6879 7.22014 11.0274C7.55958 11.3668 8.01996 11.5575 8.5 11.5575Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
