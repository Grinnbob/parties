import {StyleSheet} from 'react-native';
import {Color} from '../../../../GlobalStyles';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 24,
  },
  activityIndicator: {
    color: Color.textMainWhite,
    marginTop: 24,
  },
  newPartyText: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '700',
    color: Color.textMainWhite,
  },
  partiesContainer: {
    width: '100%',
    marginTop: 24,
  },
  partyItemContainer: {
    flexDirection: 'column',
  },
  partyItem: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  partyText: {
    fontSize: 15,
    lineHeight: 18,
    color: Color.textMainWhite,
    width: '40%',
  },
});
