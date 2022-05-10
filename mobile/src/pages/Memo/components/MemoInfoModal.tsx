import React, { FC } from 'react';
import { Button, FormControl, Input, Modal } from 'native-base';

const MemoInfoModal: FC<MemoInfoModalProps> = ({
  isVisible,
  onClose,
  onPressConfirm,
  setSummary,
  setTitle,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isVisible}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Memo</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Title</FormControl.Label>
            <Input onChangeText={setTitle} />
          </FormControl>
          <FormControl mt={3}>
            <FormControl.Label>Summary</FormControl.Label>
            <Input onChangeText={setSummary} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group>
            <Button variant="ghost" colorScheme="blue" onPress={onClose}>
              Cancel
            </Button>
            <Button onPress={onPressConfirm}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default MemoInfoModal;

interface MemoInfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPressConfirm: () => void;
  setTitle: (str: string) => void;
  setSummary: (str: string) => void;
}
