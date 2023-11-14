import React, { useCallback } from "react";
import RnRangeSlider, { SliderProps } from "rn-range-slider";
import { SliderLeftThumb, SliderRightThumb } from "../../Icons";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "./styles";
import { Text, View } from "react-native";

type RangeSliderProps = Omit<
  SliderProps,
  "renderThumb" | "renderRailSelected" | "renderRail"
> & {
  onChange: (range: [number, number]) => void;
};

export const RangeSlider: React.FC<RangeSliderProps> = ({
  onChange,
  style,
  ...rest
}) => {
  const handleValueChange = useCallback((low: number, high: number) => {
    onChange([low, high]);
  }, []);

  const renderThumb = useCallback((name: "high" | "low") => {
    return name === "low" ? <SliderLeftThumb /> : <SliderRightThumb />;
  }, []);

  const renderRailSelected = useCallback(() => {
    return (
      <LinearGradient
        style={styles.railSelected}
        locations={[0, 1]}
        colors={["#6c1b9e", "#ff077e"]}
        useAngle={true}
        angle={-90}
      />
    );
  }, []);

  const renderRail = useCallback(() => {
    return <View style={styles.rail} />;
  }, []);

  const renderLabel = useCallback((value: number) => {
    return <></>;
  }, []);

  return (
    <View style={[styles.root, style]}>
      <RnRangeSlider
        {...rest}
        onValueChanged={handleValueChange}
        renderThumb={renderThumb}
        renderRailSelected={renderRailSelected}
        renderRail={renderRail}
        renderLabel={renderLabel}
        floatingLabel={true}
      />
      <View style={styles.rangesContainer}>
        <Text style={[styles.rangeText, styles.rangeLeft]}>{rest.min}</Text>
        <Text style={styles.rangeValue}>
          {rest.low} - {rest.high}
        </Text>
        <Text style={[styles.rangeText, styles.rangeRight]}>{rest.max}+</Text>
      </View>
    </View>
  );
};
