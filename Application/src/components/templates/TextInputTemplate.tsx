import * as React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';

type ContainerProps = {
  label?: string;
  placeholder?: string;
  value: string;
  mode?: 'flat' | 'outlined';
  disabled?: boolean;
  multiline?: boolean;
  maxLength?: number;
  secureTextEntry?: boolean;
  onChangeText: (e : GestureResponderEvent) => void;
};

const TextInputTemplate = (props: Readonly<ContainerProps>) => {

  return (
    <PaperTextInput
      label={props.label ?? undefined}
      placeholder={props.placeholder ?? undefined}
      value={props.value}
      mode={props.mode ?? undefined}
      disabled={props.disabled ?? false}
      multiline={props.multiline ?? false}
      maxLength={props.maxLength ?? undefined}
      secureTextEntry={props.secureTextEntry ?? false}
      onChangeText={props.onChangeText}
    />
  );
};

export default TextInputTemplate;
