import React from 'react';
import {Text, View} from 'react-native';
import {PartyModel} from '../../../models';
import {styles} from './styles';
import dayjs from 'dayjs';
import {ProgressiveImage} from '../../../components/Atoms/ProgressiveImage';
type PartyCardProps = {
  party: PartyModel;
};

export const PartyCard: React.FC<PartyCardProps> = ({party}) => {
  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.startDateText}>
            {dayjs(party.startDate).format('MMM DD YYYY')}
          </Text>
        </View>
        <View style={styles.partyImageContainer}>
          <ProgressiveImage
            source={{
              uri: party?.image,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.partyNameText}>{party.name}</Text>
        <Text style={styles.questsText}>
          {party.attendingMin} - {party.attendingMax} Guests
        </Text>
      </View>
    </View>
  );
};
