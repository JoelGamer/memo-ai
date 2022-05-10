import { FormControl, Input } from 'native-base';
import React, { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const TextContainer: FC<TextContainerProps> = ({ text, editable, setText }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.textWrapper}
      contentContainerStyle={styles.textContentContainer}>
      <View style={styles.textContainer}>
        {editable ? (
          <FormControl>
            <Input onChangeText={setText} multiline />
          </FormControl>
        ) : (
          <Text>{text}</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default TextContainer;

interface TextContainerFixed {
  editable?: never;
  setText?: never;
}

interface TextContainerEditable {
  editable: boolean;
  setText: (v: string) => void;
}

type TextContainerProps = {
  text: string;
} & (TextContainerFixed | TextContainerEditable);

const styles = StyleSheet.create({
  textWrapper: {
    marginTop: 5,
  },
  textContentContainer: {
    paddingBottom: 5,
  },
  textContainer: {
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: 0,
    padding: 5,
    width: '95%',
  },
});
