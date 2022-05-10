import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Memo: { memo: MemoRecord };
  CreateMemo: { isText: boolean; isAudio: boolean };
};

export type ScreenProps<T = keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
