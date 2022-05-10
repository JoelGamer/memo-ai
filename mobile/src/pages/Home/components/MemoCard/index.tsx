import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const MemoCard: FC<MemoCardProps> = ({ memo }) => {
  const navigation = useNavigation();

  const onPressCard = () => {
    navigation.navigate('Memo', { memo });
  };

  return (
    <TouchableOpacity onPress={onPressCard} style={styles.container}>
      <View style={styles.cardTopContainer}>
        <Text>{memo.summary}</Text>
      </View>
      <View style={styles.cardBottomContainer}>
        <Text style={styles.cardBottomText}>{memo.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MemoCard;

interface MemoCardProps {
  memo: MemoRecord;
}
