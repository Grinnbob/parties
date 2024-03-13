import React from 'react';
import {
  ImageBackground,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {styles} from './styles';
import {CameraPlusIcon} from '../../Icons';
import {Color} from '../../../GlobalStyles';
import {useImageSelect} from '../../../hooks/useImageSelect';

export type PhotoInputProps = {
  label: string;
  onChange: (uri: string) => void;
  value?: string;
  style?: StyleProp<ViewStyle>;
  isOptional?: boolean;
};

export const PhotoInput: React.FC<PhotoInputProps> = ({
  value,
  style,
  label,
  onChange,
  isOptional,
}) => {
  const {selectImage} = useImageSelect();
  const handleCameraPress = async () => {
    const image = await selectImage();
    if (image?.assets?.[0]?.uri) {
      onChange(image.assets?.[0].uri);
    }
  };

  return (
    <View style={[styles.root, style]}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {isOptional && <Text style={styles.optionalText}>(Optional)</Text>}
      </View>
      <View style={styles.content}>
        <ImageBackground
          source={value ? {uri: value} : undefined}
          style={{position: 'absolute', width: '100%', height: '100%'}}
          imageStyle={{borderRadius: 8}}
        />
        <TouchableOpacity onPress={handleCameraPress}>
          <CameraPlusIcon color={Color.primaryPink} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
