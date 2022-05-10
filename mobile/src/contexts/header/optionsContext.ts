import { createContext } from 'react';

const OptionsContext = createContext<OptionsContext>({
  options: [],
  setOptions: () => {},
});

export default OptionsContext;

export interface Option {
  text: string;
  onPress: () => void;
}

interface OptionsContext {
  options: Option[];
  setOptions: (v: Option[]) => void;
}
