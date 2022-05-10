import { createContext } from 'react';

const ConfirmContext = createContext<ConfirmContext>({
  onPressConfirm: () => {},
  setOnPressConfirm: () => {},
});

export default ConfirmContext;

interface ConfirmContext {
  onPressConfirm: () => void;
  setOnPressConfirm: (fn: () => void) => void;
}
