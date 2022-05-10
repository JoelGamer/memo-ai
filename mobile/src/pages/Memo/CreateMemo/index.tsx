import { v4 as uuid } from 'uuid';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { Spinner } from 'native-base';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScreenProps } from '../../../@types/navigation';
import ConfirmContext from '../../../contexts/header/confirmContext';
import AudioPlayer from '../../../components/AudioPlayer';
import memo from '../../../models/memo';
import memoContent from '../../../models/memo-content';
import TextContainer from '../components/TextContainer';
import MemoInfoModal from '../components/MemoInfoModal';
import speechToText from '../../../services/speech-to-text';
import styles from './styles';

const path = (fileName: string) =>
  Platform.select({
    ios: `${RNFS.DocumentDirectoryPath}/${fileName}.m4a`,
    android: `${RNFS.DocumentDirectoryPath}/${fileName}.mp3`,
  });

const CreateMemo: FC<CreateMemoProps> = ({ route, navigation }) => {
  const { isAudio, isText } = route.params;

  const [fileID] = useState(uuid());
  const [uri, setUri] = useState('');
  const { setOnPressConfirm } = useContext(ConfirmContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoadingTranscribe, setIsLoadingTranscribe] = useState(false);

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  const onPressTranscribe = async () => {
    if (isLoadingTranscribe) return;

    setIsLoadingTranscribe(true);
    const baseAudio = await RNFS.readFile(path(fileID)!, 'base64');
    const [name, extension] = [fileID, '.mp3'];

    const response = await speechToText.create({
      file: baseAudio,
      fileFormat: extension,
      fileName: name,
    });

    setText(response.transcript || '');
    setIsLoadingTranscribe(false);
  };

  const onPressConfirm = async () => {
    setIsVisible(false);

    const memoRecord = await memo.create({
      title,
      summary,
    });

    await memoContent.create({
      memoId: memoRecord.id,
      fileId: isAudio ? fileID : '',
      text,
    });

    navigation.pop();
  };

  useEffect(() => {
    setOnPressConfirm(() => setIsVisible(true));
  }, []);

  return (
    <>
      <View style={styles.container}>
        <AudioPlayer
          fileName={fileID}
          setUri={isAudio && isText ? undefined : setUri}
        />
        {!!uri && (
          <View style={styles.transcribeContainer}>
            <TouchableOpacity
              onPress={onPressTranscribe}
              disabled={isLoadingTranscribe}
              style={styles.transcribeButton}>
              <Icon name="transcribe" size={25} />
              <Text>Transcribe</Text>
              {isLoadingTranscribe && (
                <Spinner accessibilityLabel="Loading transcription" ml={2} />
              )}
            </TouchableOpacity>
          </View>
        )}
        <TextContainer text={text} setText={setText} editable={isText} />
      </View>
      <MemoInfoModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onPressConfirm={onPressConfirm}
        setTitle={setTitle}
        setSummary={setSummary}
      />
    </>
  );
};

export default CreateMemo;

interface CreateMemoProps extends ScreenProps<'CreateMemo'> {}
