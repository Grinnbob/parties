import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {RightArrowIcon} from '../../../../components/Icons';
import {PartyModel} from '../../../../models';
import dayjs from 'dayjs';
import {ProgressiveImage} from '../../../../components/Atoms/ProgressiveImage';
import {Skeleton} from 'native-base';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

type PartyCardProps = {
  party: PartyModel;
  onPress: () => void;
  price: number;
};

export const PartyCard: React.FC<PartyCardProps> = ({
  party,
  price,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View style={styles.partyContainer}>
        <View style={styles.partyImageNotFound}>
          <ProgressiveImage
            source={{
              uri: party?.image,
            }}
            style={styles.image}
            resizeMode="cover"
            notFoundIconProps={{
              width: 24,
              height: 24,
            }}
            indicator={() => {
              return <Skeleton width={12} height={12} borderRadius={50} />;
            }}
          />
        </View>
        <View style={styles.partyInnerContainer}>
          <Text style={styles.titleText}>{party.name}</Text>
          <View style={styles.partyDateContainer}>
            <Text style={styles.partyDateText}>
              {dayjs(party.startDate, 'YYYY-MM-DD').format('MM/DD/YYYY')}
            </Text>
            {!!party.startTime && !!party.endTime && (
              <Text style={styles.partyDateText}>
                {dayjs(party.startTime).format('h:mm A')} -{' '}
                {dayjs(party.endTime).format('h:mm A')}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <RightArrowIcon style={styles.arrowIcon} />
        <Text style={styles.titleText}>{formatter.format(price)}</Text>
      </View>
    </TouchableOpacity>
  );
};
