import { Button as PaperButton } from 'react-native-paper';
import { Props as PaperButtonProps } from 'react-native-paper/src/components/Button/Button';
import { StyleSheet } from 'react-native';
import { ReactNode } from 'react';

export default function ButtonTemplate(
  props: Readonly<PaperButtonProps>
): ReactNode {
  return (
    <PaperButton
      theme={props.theme ?? undefined}
      style={props.style ?? styles.button}
      mode={props.mode ?? 'contained'}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
  },
});
