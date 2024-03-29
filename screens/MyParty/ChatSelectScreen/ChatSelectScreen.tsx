import React, {FC, useCallback, useMemo} from 'react';
import {styles} from './styles';
import {FlatList, ImageBackground, Text, View} from 'react-native';
import {BackButton} from '../../../components/navigation/BackButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ConversationModel, PartyModel} from '../../../models';
import {Divider} from '../../../components/Atoms';
import {VendorCard} from '../../../components/VendorCard';

type ChatSelectScreenProps = {
  route: {
    params: {
      party: PartyModel;
      conversations: ConversationModel[];
    };
  };
};

export const ChatSelectScreen: FC<ChatSelectScreenProps> = ({route}) => {
  const {party, conversations} = route.params;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.pop();
  };

  console.log('conversations', conversations);

  const handleMessagesPress = useCallback((conversationId: number) => {
    navigation.push('PartyMessageScreen', {
      party,
      conversationId,
    });
  }, []);

  const keyExtractor = useCallback((item: ConversationModel) => {
    return String(item.id);
  }, []);

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require('../../../assets/bg11.png')}
      />
      <View style={[styles.header, {paddingTop: insets.top ? insets.top : 24}]}>
        <BackButton onPress={handleBackPress} />
        <View>
          <Text style={styles.title}>{party.name}</Text>
          <Text style={styles.serviceName}>{party.description}</Text>
        </View>
        <View style={styles.hidden} />
      </View>
      <Divider style={styles.divider} />
      <FlatList
        data={conversations}
        bounces={false}
        contentContainerStyle={styles.scrollView}
        keyExtractor={keyExtractor}
        renderItem={({item}) => {
          const {vendor, id} = item;
          return (
            <VendorCard
              name={vendor?.name}
              background={vendor?.background}
              actionText="View Messages"
              onActionPress={() => {
                handleMessagesPress(id);
              }}
            />
          );
        }}
      />
    </View>
  );
};
