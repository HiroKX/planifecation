import React, {ReactNode, useMemo} from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { StyleProp, TextStyle } from 'react-native';
import PasswordInput from './PasswordInput';

type FormValues = {
  password: string;
};
type PasswordConfirmInputProps = {
  control: Control<any>;
  errors: FieldErrors<FormValues>;
  style?: StyleProp<TextStyle>;
};

export default function PasswordInputRandomized(
  props: Readonly<PasswordConfirmInputProps>
): ReactNode {
  const randomize = require('randomatic');
  const word = useMemo(() => randomize('*', 2), []);

  const validation = (val: string) => {
    if (val != word) {
      return 'Le mot de passe doit être ' + word;
    }
  };

  return (
    <PasswordInput
      control={props.control}
      errors={props.errors}
      style={props.style}
      validation={validation}
    ></PasswordInput>
  );
}
