import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { SvgIconProps } from "../../types";

export const GuestsIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <G id="Iconsax/Linear/people" clipPath="url(#clip0_209_18207)">
        <Path
          id="Vector"
          d="M14.1448 12.0307C15.2865 12.2224 16.5448 12.0224 17.4281 11.4307C18.6031 10.6474 18.6031 9.36406 17.4281 8.58073C16.5365 7.98906 15.2615 7.78906 14.1198 7.98906M5.83646 12.0307C4.69479 12.2224 3.43646 12.0224 2.55313 11.4307C1.37813 10.6474 1.37813 9.36406 2.55313 8.58073C3.44479 7.98906 4.71979 7.78906 5.86146 7.98906M15.0031 5.96406C14.9507 5.95572 14.8972 5.95572 14.8448 5.96406C14.2887 5.94395 13.7621 5.7084 13.3765 5.3072C12.9908 4.90599 12.7762 4.37056 12.7781 3.81406C12.7781 2.6224 13.7365 1.66406 14.9281 1.66406C15.4983 1.66406 16.0452 1.89058 16.4484 2.29378C16.8516 2.69699 17.0781 3.24385 17.0781 3.81406C17.0766 4.37096 16.8598 4.90569 16.4731 5.30641C16.0863 5.70712 15.5596 5.94277 15.0031 5.96406ZM4.97812 5.96406C5.02812 5.95573 5.08646 5.95573 5.13646 5.96406C5.6926 5.94395 6.21913 5.7084 6.60479 5.3072C6.99044 4.90599 7.205 4.37056 7.20313 3.81406C7.20313 2.6224 6.24479 1.66406 5.05313 1.66406C4.48291 1.66406 3.93605 1.89058 3.53285 2.29378C3.12964 2.69699 2.90313 3.24385 2.90313 3.81406C2.91146 4.98073 3.82812 5.9224 4.97812 5.96406ZM10.0031 12.1891C9.95068 12.1807 9.89724 12.1807 9.84479 12.1891C9.28865 12.169 8.76212 11.9334 8.37646 11.5322C7.99081 11.131 7.77625 10.5956 7.77813 10.0391C7.77813 8.8474 8.73646 7.88906 9.92813 7.88906C10.4983 7.88906 11.0452 8.11558 11.4484 8.51878C11.8516 8.92199 12.0781 9.46885 12.0781 10.0391C12.0698 11.2057 11.1531 12.1557 10.0031 12.1891ZM7.57813 14.8141C6.40313 15.5974 6.40313 16.8807 7.57813 17.6641C8.91146 18.5557 11.0948 18.5557 12.4281 17.6641C13.6031 16.8807 13.6031 15.5974 12.4281 14.8141C11.1031 13.9307 8.91146 13.9307 7.57813 14.8141Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_209_18207">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
