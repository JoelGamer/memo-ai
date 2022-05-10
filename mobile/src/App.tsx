import React, { useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import OptionsContext, { Option } from './contexts/header/optionsContext';
import Routes from './routes';
import ConfirmContext from './contexts/header/confirmContext';

const noop = () => {};

const App = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [onPressConfirm, setOnPressConfirm] = useState<() => void>(() => noop);

  const onSet = (fn: () => void) => {
    setOnPressConfirm(() => fn);
  };

  return (
    <OptionsContext.Provider value={{ options, setOptions }}>
      <ConfirmContext.Provider
        value={{ onPressConfirm, setOnPressConfirm: onSet }}>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </ConfirmContext.Provider>
    </OptionsContext.Provider>
  );
};

export default App;
