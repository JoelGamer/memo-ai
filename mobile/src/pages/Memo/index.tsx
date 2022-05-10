import React, { FC, useContext, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { ScreenProps } from '../../@types/navigation';
import RNFS from 'react-native-fs';
import AudioPlayer from '../../components/AudioPlayer';
import OptionsContext from '../../contexts/header/optionsContext';
import useAsyncState from '../../hooks/use-async-state';
import memo from '../../models/memo';
import TextContainer from './components/TextContainer';
import styles from './styles';
import speechToText from '../../services/speech-to-text';

const path = (fileName: string) =>
  Platform.select({
    ios: `${RNFS.DocumentDirectoryPath}/${fileName}.m4a`,
    android: `${RNFS.DocumentDirectoryPath}/${fileName}.mp3`,
  });

const Memo: FC<MemoProps> = ({ route, navigation }) => {
  const { memo: memoRecord } = route.params;
  const { setOptions } = useContext(OptionsContext);
  const [memoContent, loading] = useAsyncState<MemoContentRecord | undefined>(
    async () => (memoRecord ? await memo.memo_content(memoRecord) : undefined),
    [route.params],
  );

  const onPressDelete = async () => {
    await memo.delete(memoRecord.id);
    navigation.pop();
  };

  const onPressText = async () => {
    if (!memoContent?.fileId) return;

    const baseAudio = await RNFS.readFile(path(memoContent.fileId)!, 'base64');
    const [name, extension] = [memoContent.fileId, '.mp3'];

    const resp = await speechToText.create({
      file: baseAudio,
      fileFormat: extension,
      fileName: name,
    });

    console.log('resp', resp);
  };

  useEffect(() => {
    setOptions([
      { text: 'Title', onPress: onPressText },
      { text: 'Delete', onPress: onPressDelete },
    ]);
  }, [memoRecord, memoContent]);

  if (!memoContent || loading) return null;

  return (
    <View style={styles.container}>
      <AudioPlayer
        fileName={memoContent.fileId}
        text={memoContent.text}
        recorded
      />
      <TextContainer text={memoContent.text} />
    </View>
  );
};

export default Memo;

interface MemoProps extends ScreenProps<'Memo'> {}
