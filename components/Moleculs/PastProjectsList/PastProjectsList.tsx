import React, {useCallback, useMemo} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {CameraPlusIcon} from '../../Icons';
import {Color} from '../../../GlobalStyles';
import {VendorAlbumModel} from '../../../models';
import {ProgressiveImage} from '../../Atoms/ProgressiveImage';
import {Skeleton} from 'native-base';

type PastProjectsListProps = {
  label?: string;
  data?: VendorAlbumModel[];
  canEdit?: boolean;
};

export const PastProjectsList: React.FC<PastProjectsListProps> = ({
  label = 'Past Projects',
  data,
  canEdit,
}) => {
  const navigation = useNavigation();

  const actualData = useMemo(() => {
    if (canEdit) {
      return [{} as VendorAlbumModel, ...(data || [])];
    }
    return data || [];
  }, [data, canEdit]);

  const renderItem = useCallback(
    ({item}: {item: VendorAlbumModel}) => {
      if (!item?.name) {
        return (
          <TouchableOpacity
            onPress={() => navigation.push('Album')}
            style={styles.addContainer}>
            <View style={styles.addBg} />
            <CameraPlusIcon color={Color.primaryPink} style={styles.addIcon} />
            <Text style={[styles.name, styles.addName]} numberOfLines={2}>
              Add Photos or Videos
            </Text>
          </TouchableOpacity>
        );
      }
      return (
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imageWrapper}>
            <ProgressiveImage
              source={{uri: item.documents[0]?.link || ''}}
              style={styles.image}
              resizeMode="cover"
              notFoundIconProps={{
                width: 40,
                height: 40,
              }}
              indicator={() => {
                return <Skeleton width={92} height={92} borderRadius={8} />;
              }}
            />
          </TouchableOpacity>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode={'tail'}>
            {item.name}
          </Text>
        </View>
      );
    },
    [navigation],
  );

  const keyExtractor = useCallback((item: VendorAlbumModel) => {
    return String(item.id);
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <FlatList
        data={actualData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imagesContainer}
        bounces={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};
