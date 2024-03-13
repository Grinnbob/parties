import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgIconProps} from '../../types';

export const CardIcon: React.FC<SvgIconProps> = props => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M1.66406 7.08594H18.3307M4.9974 13.7526H6.66406M8.7474 13.7526H12.0807"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.36406 2.92188H14.6224C17.5891 2.92188 18.3307 3.65521 18.3307 6.58021V13.4219C18.3307 16.3469 17.5891 17.0802 14.6307 17.0802H5.36406C2.40573 17.0885 1.66406 16.3552 1.66406 13.4302V6.58021C1.66406 3.65521 2.40573 2.92188 5.36406 2.92188Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
