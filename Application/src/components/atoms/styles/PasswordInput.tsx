import React from 'react';
import TextInputTemplate from './TextInputTemplate';
import { HelperText } from 'react-native-paper';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type FormValues = {
  password: string;
};
type PasswordConfirmInputProps = {
  control: Control<any, any>;
  errors: FieldErrors<FormValues>;
};

export default function PasswordInput(
  props: Readonly<PasswordConfirmInputProps>
): any {
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
            label="Mot de passe"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={true}
          />
          {props.errors.password && (
            <HelperText type="error">
              {props.errors.password?.message}
            </HelperText>
          )}
        </>
      )}
      name="password"
    />
  );
}
