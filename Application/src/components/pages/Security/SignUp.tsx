import React, { ReactNode } from 'react';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { useApolloClient } from '@apollo/client';
import { SignUpUser } from '../../../controllers/AuthenticationController';
import { StackParamList } from '../../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import PasswordInput from '../../atoms/styles/PasswordInput';
import UsernameInput from '../../atoms/styles/UsernameInput';
import PasswordConfirmInput from '../../atoms/styles/PasswordConfirmInput';

type Props = NativeStackScreenProps<StackParamList>;
type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp(props: Readonly<Props>): ReactNode {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const client = useApolloClient();
  const onSubmit = handleSubmit(async data => {
    try {
      await SignUpUser(client, data.username, data.password, props);
    } catch (error: any) {
      setError('username', {
        type: 'server',
        message: error.message,
      });
    }
  });

  return (
    <SurfaceTemplate>
      <UsernameInput control={control} errors={errors} />
      <PasswordInput control={control} errors={errors} />
      <PasswordConfirmInput control={control} errors={errors} watch={watch} />
      <ButtonTemplate onPress={onSubmit}>M'inscrire</ButtonTemplate>
    </SurfaceTemplate>
  );
}
