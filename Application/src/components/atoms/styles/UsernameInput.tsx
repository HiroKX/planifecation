import React from 'react';
import TextInputTemplate from './TextInputTemplate';
import { HelperText } from 'react-native-paper';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type FormValues = {
  username: string;
};
type PasswordInputProps = {
  control: Control<any>;
  errors: FieldErrors<FormValues>;
};

export default function UsernameInput(props: PasswordInputProps): any {
  return (
    <Controller
      control={props.control}
      rules={{
        required: 'Ce champ est requis',
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInputTemplate
            label="Nom d'utilisateur"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
          {props.errors.username && (
            <HelperText type="error">
              {props.errors.username?.message}
            </HelperText>
          )}
        </>
      )}
      name="username"
    />
  );
}
