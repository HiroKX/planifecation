import React, {ReactNode} from 'react';
import TextInputTemplate from './TextInputTemplate';
import { HelperText } from 'react-native-paper';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { StyleProp, TextStyle } from 'react-native';

// Importez d'autres composants nécessaires ici
type FormValues = {
  confirmPassword: string;
};
type PasswordInputProps = {
  control: Control<any>;
  errors: FieldErrors<FormValues>;
  style?: StyleProp<TextStyle>;
  watch: any;
};

export default function PasswordConfirmInput(
  props: Readonly<PasswordInputProps>
): ReactNode {
  return (
    <Controller
      control={props.control}
      rules={{
        required: 'Ce champ est requis',
        validate: (val: string) => {
          if (props.watch('password') != val) {
            return 'Les mots de passe ne correspondent pas.';
          }
        },
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInputTemplate
            style={props.style ?? undefined}
            label="Confirmer le mot de passe"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={true}
          />
          {props.errors.confirmPassword && (
            <HelperText type="error">
              {props.errors.confirmPassword?.message}
            </HelperText>
          )}
        </>
      )}
      name="confirmPassword"
    />
  );
}
