import { StyleSheet } from 'react-native';
import { ACCENT } from '../../../../styles/colors';

const b = '#171412';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 5,
    width: '95%',
  },
  cardTopContainer: {
    padding: 2,
    paddingLeft: 5,
    maxHeight: 100,
    maxWidth: '100%',
  },
  cardBottomContainer: {
    backgroundColor: ACCENT,
    padding: 2,
    paddingLeft: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  cardBottomText: {
    color: 'white',
  },
});
