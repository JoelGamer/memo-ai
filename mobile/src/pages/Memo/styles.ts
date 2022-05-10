import { StyleSheet, ViewStyle } from 'react-native';

const baseContainer: ViewStyle = {
  alignSelf: 'center',
  backgroundColor: '#FFF',
  borderRadius: 5,
  marginTop: 5,
  padding: 5,
  width: '95%',
};

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  audioContainer: {
    ...baseContainer,
  },
  textWrapper: {
    marginTop: 5,
    marginBottom: 10,
  },
  textContainer: {
    ...baseContainer,
    marginTop: 0,
  },
});
