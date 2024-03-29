import { Modal, ModalProps } from 'react-native-paper';

export default function ModalTemplate(props: Readonly<ModalProps>) {
  return (
    <Modal {...props} style={props.style ?? { alignItems: 'center' }}></Modal>
  );
}
