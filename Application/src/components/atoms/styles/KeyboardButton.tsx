import { Button as PaperButton } from 'react-native-paper';
import { Props as PaperButtonProps } from 'react-native-paper/src/components/Button/Button';
import { StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { theme } from '../../organisms/OwnPaperProvider';

export default function KeyboardButton(
  props: Readonly<PaperButtonProps>
): ReactNode {
  return (
    <PaperButton
      theme={props.theme ?? undefined}
      style={[styles.button ,props.style]}
      mode={props.mode ?? 'text'}
      compact={props.compact ?? true}
      labelStyle={props.labelStyle ?? {marginHorizontal:0}}
      textColor={props.textColor ?? undefined}
      buttonColor={props.buttonColor ?? theme.colors.secondary}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
  },
});
