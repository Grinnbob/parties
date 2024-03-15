import {StyleSheet} from 'react-native';
import {Color} from '../../../GlobalStyles';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    gap: 24,
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: Color.textMainWhite,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  imageWrapper: {
    backgroundColor: Color.gray300,
    borderRadius: 4,
  },
  imageContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  name: {
    fontSize: 10,
    lineHeight: 14,
    color: Color.textMainWhite,
  },
  addContainer: {
    flexDirection: 'column',
    position: 'relative',
    gap: 8,
    width: 92,
  },
  addBg: {
    backgroundColor: '#333333',
    width: 92,
    height: 92,
    borderRadius: 8,
  },
  addIcon: {
    position: 'absolute',
    left: 18,
    top: 18,
  },
  image: {
    width: 92,
    height: 92,
    borderRadius: 8,
  },
  addName: {
    textAlign: 'center',
  },
});
