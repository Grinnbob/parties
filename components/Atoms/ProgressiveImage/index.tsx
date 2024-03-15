import React, {FC, useCallback, useState, useMemo} from 'react';
import FastImage, {
  FastImageProps,
  OnProgressEvent,
} from 'react-native-fast-image';
import {View} from 'react-native';
import {createImageProgress} from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Pie';
import {Color} from '../../../GlobalStyles';
import {NotFoundImageIcon} from '../../Icons';

const Image = createImageProgress(FastImage);

export const ProgressiveImage: FC<
  FastImageProps &
    Partial<{
      indicator?: React.ComponentType;
      indicatorProps: Partial<{
        size: number;
        borderWidth: number;
        color: string;
        unfilledColor: string;
      }>;
      notFoundIconProps: Partial<{
        width: number;
        height: number;
        color: string;
      }>;
    }>
> = ({
  style,
  notFoundIconProps,
  indicatorProps = {
    size: 25,
    color: Color.textMainWhite,
  },
  indicator,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleProgress = useCallback(
    (e: OnProgressEvent) => {
      const value = e.nativeEvent.loaded / e.nativeEvent.total;
      if (!isLoaded && value === 1) {
        setIsLoaded(true);
      }
    },
    [isLoading],
  );

  const handleError = useCallback(() => {
    setIsError(true);
  }, []);

  const memorizedImage = useMemo(
    () => (
      <Image
        {...rest}
        style={style}
        resizeMode="cover"
        onProgress={handleProgress}
        onError={handleError}
        indicator={indicator || ProgressBar}
        indicatorProps={{
          ...indicatorProps,
        }}
      />
    ),
    [style, rest, handleProgress, handleError],
  );

  const notFoundProps = {
    width: 80,
    height: 80,
    color: Color.textMainWhite,
  };

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        style,
      ]}>
      {isError || !rest?.source?.uri ? (
        <NotFoundImageIcon {...notFoundProps} {...notFoundIconProps} />
      ) : (
        memorizedImage
      )}
    </View>
  );
};
