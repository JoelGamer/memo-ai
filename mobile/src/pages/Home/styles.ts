import { StyleSheet } from 'react-native';
import { ACCENT } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 2,
  },
  footerAddButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ACCENT,
    borderRadius: 50,
    width: 50,
    height: 50,

    elevation: 5,

    top: -25,
  },
});
