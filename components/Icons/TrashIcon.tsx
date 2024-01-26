import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const TrashIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M19.5 6.48073C16.725 6.20573 13.9333 6.06406 11.15 6.06406C9.5 6.06406 7.85 6.1474 6.2 6.31406L4.5 6.48073M9.08333 5.63906L9.26667 4.5474C9.4 3.75573 9.5 3.16406 10.9083 3.16406H13.0917C14.5 3.16406 14.6083 3.78906 14.7333 4.55573L14.9167 5.63906M17.7083 9.11406L17.1667 17.5057C17.075 18.8141 17 19.8307 14.675 19.8307H9.325C7 19.8307 6.925 18.8141 6.83333 17.5057L6.29167 9.11406M10.6083 15.2474H13.3833M9.91667 11.9141H14.0833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
