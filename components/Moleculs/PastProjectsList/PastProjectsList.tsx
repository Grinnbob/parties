import React, { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { CameraPlusIcon } from "../../Icons";
import { Color } from "../../../GlobalStyles";
import { VendorAlbumModel } from "../../../models";

type PastProjectsListProps = {
  label?: string;
  data?: VendorAlbumModel[];
  canEdit?: boolean;
};

export const PastProjectsList: React.FC<PastProjectsListProps> = ({
  label = "Past Projects",
  data,
  canEdit,
}) => {
  const { navigate } = useNavigation();

  const actualData = useMemo(() => {
    if (canEdit) {
      return [{} as VendorAlbumModel, ...(data || [])];
    }
    return data || [];
  }, [data, canEdit]);

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <FlatList
        data={actualData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imagesContainer}
        bounces={false}
        renderItem={({ item }) => {
          if (!item?.name) {
            return (
              <TouchableOpacity
                onPress={() => navigate("Album")}
                style={styles.addContainer}
              >
                <View style={styles.addBg} />
                <CameraPlusIcon
                  color={Color.primaryPink}
                  style={styles.addIcon}
                />
                <Text style={[styles.name, styles.addName]} numberOfLines={2}>
                  Add Photos or Videos
                </Text>
              </TouchableOpacity>
            );
          }
          return (
            <View style={styles.imageContainer}>
              <TouchableOpacity>
                <FastImage
                  source={{ uri: item.documents[0]?.link || "" }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <Text
                style={styles.name}
                numberOfLines={2}
                ellipsizeMode={"tail"}
              >
                {item.name}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
