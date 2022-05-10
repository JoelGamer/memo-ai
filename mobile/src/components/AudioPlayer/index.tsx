import React, { FC, useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { Progress } from 'native-base';
import RNFS from 'react-native-fs';
import TTS from 'react-native-tts';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ACCENT } from '../../styles/colors';
import styles from './styles';

const audioRecorderPlayer = new AudioRecorderPlayer();
const path = (fileName: string) =>
  Platform.select({
    ios: `${RNFS.DocumentDirectoryPath}/${fileName}.m4a`,
    android: `${RNFS.DocumentDirectoryPath}/${fileName}.mp3`,
  });

const PlayOrPause: FC<{ playing: boolean }> = ({ playing }) => {
  return playing ? (
    <Icon name="pause" size={25} />
  ) : (
    <Icon name="play" size={25} />
  );
};

const AudioPlayer: FC<AudioPlayerProps> = ({
  fileName,
  text,
  setUri,
  recorded,
}) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState('00:00');
  const [duration, setDuration] = useState('00:00');

  const playerStart = async () => {
    const uri = await audioRecorderPlayer.startRecorder(path(fileName));
    setUri && setUri(uri);

    audioRecorderPlayer.addRecordBackListener((e) => {
      setTimeElapsed(audioRecorderPlayer.mmssss(e.currentPosition).slice(0, 5));
    });
  };

  const playerStop = async () => {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
  };

  const recordedPlayerStart = async () => {
    await audioRecorderPlayer.startPlayer(`file:///${path(fileName)}`);
    audioRecorderPlayer.addPlayBackListener((e) => {
      setProgress((e.currentPosition / e.duration) * 100);
      setDuration(audioRecorderPlayer.mmssss(e.duration).slice(0, 5));
      setTimeElapsed(audioRecorderPlayer.mmssss(e.currentPosition).slice(0, 5));

      if (e.currentPosition === e.duration) setPlaying(false);
    });
  };

  const recordedPlayerStop = async () => {
    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removeRecordBackListener();
  };

  const onClickPlay = () => {
    if (recorded) {
      if (!fileName) {
        playing ? TTS.stop() : TTS.speak(text || 'Missing text for TTS');
      } else {
        playing ? recordedPlayerStop() : recordedPlayerStart();
      }
    } else {
      playing ? playerStop() : playerStart();
    }

    setPlaying(!playing);
  };

  useEffect(() => {
    TTS.addEventListener('tts-start', (event) => console.log('start', event));
    TTS.addEventListener('tts-progress', (event) =>
      console.log('progress', event),
    );
    TTS.addEventListener('tts-finish', () => setPlaying(false));
    TTS.addEventListener('tts-cancel', (event) => console.log('cancel', event));

    return () => {
      TTS.removeAllListeners('tts-start');
      TTS.removeAllListeners('tts-progress');
      TTS.removeAllListeners('tts-finish');
      TTS.removeAllListeners('tts-cancel');
      TTS.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        <TouchableOpacity onPress={onClickPlay}>
          <PlayOrPause playing={playing} />
        </TouchableOpacity>
        <Progress
          _filledTrack={{ bg: ACCENT }}
          style={styles.playerProgress}
          value={progress}
        />
      </View>
      <View style={styles.timeElapsedContainer}>
        <Text>
          {timeElapsed} {recorded ? `/ ${duration}` : ''}
        </Text>
      </View>
    </View>
  );
};

export default AudioPlayer;

interface AudioPlayerProps {
  fileName: string;
  text?: string;
  setUri?: (uri: string) => void;
  recorded?: boolean;
}
