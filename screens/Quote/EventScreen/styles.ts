import {StyleSheet} from 'react-native';
import {Color, Padding} from '../../../GlobalStyles';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  bgIcon: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  partyImageNotFound: {
    height: 300,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.gray300,
  },
  image: {
    height: 300,
    width: '100%',
  },
  notFoundImageIcon: {
    color: Color.textMainWhite,
  },
  header: {
    height: 300,
    position: 'relative',
  },
  headerInnerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: Padding.p_5xl,
  },
  backButtonContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    padding: 8,
    borderRadius: 100,
    width: 44,
  },
  backButton: {
    height: 40,
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Padding.p_5xl,
    justifyContent: 'flex-start',
    marginTop: 12,
    gap: 24,
  },
  hidden: {
    width: 19,
  },
  divider: {
    marginVertical: 0,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  actionButtonContainer: {
    width: '50%',
  },
  leftButton: {
    borderRadius: 8,
    marginRight: 8,
    // height: 40,
  },
  rightButton: {
    borderRadius: 8,
    marginLeft: 8,
    height: 40,
  },
  actionButtonText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
