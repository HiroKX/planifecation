import React from 'react';
import { Snackbar } from 'react-native-paper';

type ContainerProps = {
  children: React.ReactNode;
};

const SnackBarService = props => {
  const [visible, setVisible] = React.useState(false);

  const toggle = () => setVisible(!visible);
  const close = () => setVisible(false);
  const open = () => setVisible(true);

  return (
    <Snackbar
      visible={visible}
      onDismiss={close}
      action={{
        label: 'Fermer',
        onPress: () => {
          close();
        },
      }}
    >
      props.children
    </Snackbar>
  );
};
export default SnackBarService;
