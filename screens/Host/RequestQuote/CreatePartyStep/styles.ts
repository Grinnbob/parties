import {Dimensions, StyleSheet} from 'react-native';
import {Color} from '../../../../GlobalStyles';
const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: Color.textMainWhite,
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: Color.gray300,
    marginTop: 8,
  },
  partyNameInput: {
    width: '100%',
    marginTop: 16,
  },
  inputsContainer: {
    flexDirection: 'column',
    gap: 24,
  },
  timePickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timePicker: {
    width: (width - 64) / 2,
  },
  addPhotoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  addPhotoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#333333',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 100,
  },
  addPhotoText: {
    marginTop: 8,
    fontSize: 10,
    lineHeight: 14,
    color: Color.textMainWhite,
  },
  imageContainer: {
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  deleteContainer: {position: 'absolute', right: 10, top: 10},
});
