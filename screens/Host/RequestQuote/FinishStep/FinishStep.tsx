import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {RequestSendIcon} from '../../../../components/Icons';

export const FinishStep: React.FC = () => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <RequestSendIcon />
        <Text style={styles.title}>Your request has been sent!</Text>
        <View style={styles.textContainer}>
          <View style={styles.textInnerContainer}>
            <Text style={styles.subTitle}>What’s next?</Text>
            <View style={styles.textItem}>
              <Text style={styles.round}>&#9679;</Text>
              <Text style={styles.text}>
                You’ll get response within 24 hours
              </Text>
            </View>
            <View style={styles.textItem}>
              <Text style={styles.round}>&#9679;</Text>
              <Text style={styles.text}>
                Please review and accept the services that are right for you
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
