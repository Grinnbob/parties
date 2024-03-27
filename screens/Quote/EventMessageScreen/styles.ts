import {StyleSheet} from 'react-native';
import {Color, FontFamily, FontSize, Padding} from '../../../GlobalStyles';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: "flex-start",
    paddingHorizontal: 24,
  },
  backButton: {
    marginLeft: 15,
    height: 40,
    width: 40,
  },
  title: {
    fontSize: FontSize.size_5xl,
    lineHeight: 22,
    fontWeight: '700',
    color: Color.textMainWhite,
    width: '100%',
    textAlign: 'center',
  },
  bgIcon: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
  },
  serviceName: {
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    marginTop: 8,
    color: '#8A8A8A',
    width: '100%',
    marginBottom: 16,
    textAlign: 'center',
  },
  hidden: {
    marginRight: 15,
    height: 24,
    width: 24,
  },
  divider: {
    marginBottom: 0,
  },
});
