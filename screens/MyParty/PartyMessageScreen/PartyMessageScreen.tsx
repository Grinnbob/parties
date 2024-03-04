import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {Divider} from '../../../components/Atoms';
import {Chat} from '../../../components/Chat';
import useGlobalState from '../../../stateManagement/hook';
import StateTypes from '../../../stateManagement/StateTypes';
import {PartyModel} from '../../../models';
import {BackButton} from '../../../components/navigation/BackButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type PartyMessageScreenProps = {
  route: {
    params: {
      party: PartyModel;
      conversationId: number;
    };
  };
};

export const PartyMessageScreen: React.FC<PartyMessageScreenProps> = ({
  route,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const {conversationId, party} = route.params;

  const [user] = useGlobalState(StateTypes.user.key, StateTypes.user.default);

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
      <Divider />
      <Chat conversationId={conversationId} userId={user.id} />
    </View>
  );
};
