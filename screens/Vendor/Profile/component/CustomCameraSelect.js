import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  Padding,
} from "../../../../GlobalStyles";
import Check from "../../../../assets/AlbumCheck.svg";

const width = Dimensions.get("screen").width;

const CustomCameraSelect = ({ item, enable, onPress, index, imageStyles }) => {
  const style = getChildrenStyle();
  return (
    <TouchableOpacity onPress={onPress} style={imageStyles}>
      <ImageBackground
        source={{ uri: item.node.image.uri }}
        style={{
          width: undefined,
          height: undefined,
          flex: 1,
          borderRadius: 18,
        }}
        resizeMode={"cover"}
      >
        {enable && (
          <View style={styles.thumbIcon}>
            <Check />
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const getChildrenStyle = () => {
  return {
    width: (width - 18) / 2,
    height: Number(Math.random() * 20 + 12) * 10,
    backgroundColor: "gray",
    margin: 4,
    borderRadius: 18,
  };
};

const styles = StyleSheet.create({
  thumbIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    zIndex: 100,
    left: (width - 18) / 2 - 22,
    top: width * 0.01,
  },
  photo: {
    width: width * 0.27,
    height: width * 0.27,
    minHeight: 120,
    minWidth: 120,
    borderRadius: 8,
  },
  view: {
    margin: width * 0.02,
  },
});

export default CustomCameraSelect;
