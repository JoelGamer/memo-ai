import { v4 as uuid } from 'uuid';
import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScreenProps } from '../../../@types/navigation';
import ConfirmContext from '../../../contexts/header/confirmContext';
import AudioPlayer from '../../../components/AudioPlayer';
import memo from '../../../models/memo';
import memoContent from '../../../models/memo-content';
import TextContainer from '../components/TextContainer';
import MemoInfoModal from '../components/MemoInfoModal';
import styles from './styles';

// const speechToText = async (uri: string) => {
//   const d = await SPEECH_CLIENT.recognize({
//     audio: { uri },
//     config: { encoding: 'AMR', sampleRateHertz: 22000, languageCode: 'pt-BR' },
//   });
// };

const CreateMemo: FC<CreateMemoProps> = ({ route, navigation }) => {
  const { isAudio, isText } = route.params;

  const [fileID] = useState(uuid());
  const [uri, setUri] = useState('');
  const { setOnPressConfirm } = useContext(ConfirmContext);
  const [isVisible, setIsVisible] = useState(false);

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

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
