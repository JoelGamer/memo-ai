import React, { FC, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Menu, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAsyncState from '../../hooks/use-async-state';
import memo from '../../models/memo';
import MemoCard from './components/MemoCard';
import styles from './styles';

const Home: FC = () => {
  const navigation = useNavigation();
  const [memos, loading, reload] = useAsyncState(async () => memo.all());

  const onPressOption = (option: 'Audio' | 'Text' | 'Audio and Text') => {
    const fn = {
      Audio: () =>
        navigation.navigate('CreateMemo', { isText: false, isAudio: true }),
      Text: () =>
        navigation.navigate('CreateMemo', { isText: true, isAudio: false }),
      'Audio and Text': () =>
        navigation.navigate('CreateMemo', { isText: true, isAudio: true }),
    }[option];

    fn();
  };

  useEffect(() => {
    const listener = () => reload();

    memo.addEventListener('create', listener);
    memo.addEventListener('delete', listener);

    return () => {
      memo.removeEventListener('create', listener);
      memo.removeEventListener('delete', listener);
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={loading ? [] : memos}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <MemoCard memo={item} />}
        onRefresh={reload}
        refreshing={loading}
        contentContainerStyle={{ paddingBottom: 25 }}
      />
      <View style={styles.footerContainer}>
        <Menu
          trigger={(triggerProps) => (
            <Pressable style={styles.footerAddButton} {...triggerProps}>
              <Icon name="plus" color="white" size={25} />
            </Pressable>
          )}>
          <Menu.Item onPress={() => onPressOption('Audio')}>Audio</Menu.Item>
          <Menu.Item onPress={() => onPressOption('Text')}>Text</Menu.Item>
          <Menu.Item onPress={() => onPressOption('Audio and Text')}>
            Audio and Text
          </Menu.Item>
        </Menu>
      </View>
    </View>
  );
};

export default Home;
