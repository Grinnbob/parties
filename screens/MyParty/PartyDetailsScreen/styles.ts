import {StyleSheet} from 'react-native';
import {Color, Padding} from '../../../GlobalStyles';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  partyImage: {
    height: 300,
    width: '100%',
    position: 'absolute',
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
  bgIcon: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    height: '100%',
    marginTop: 24,
  },
  eventDetailsContainer: {
    flexDirection: 'column',
    flex: 1,
    gap: 24,
    justifyContent: 'flex-start',
    paddingHorizontal: Padding.p_5xl,
  },
  tabContainer: {
    display: 'none',
    flexDirection: 'column',
    flex: 1,
  },
  visibleTab: {
    display: 'flex',
  },
  activityIndicator: {
    marginTop: 24,
    color: Color.primaryPink,
  },
});
