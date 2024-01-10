import React, { useState, useEffect, ReactNode } from 'react';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { useApolloClient } from '@apollo/client';
import { GetLoggedUser } from '../../../controllers/AuthenticationController';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import { UpdateUserAndLogout } from '../../../controllers/UserController';
import { useForm } from 'react-hook-form';
import PasswordInput from '../../atoms/styles/PasswordInput';
import PasswordConfirmInput from '../../atoms/styles/PasswordConfirmInput';

type Props = NativeStackScreenProps<StackParamList>;
type FormValues = {
  password: string;
  confirmPassword: string;
};
export default function Profile(props: Readonly<Props>): ReactNode {
  const [username, setUsername] = useState('');
  useEffect(() => {
    async function getLoggedUser() {
      await GetLoggedUser().then(user => {
        setUsername(user.username);
      });
    }

    getLoggedUser();
  }, []);
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const {
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const client = useApolloClient();
  const onSubmit = handleSubmit(async data => {
    try {
      await UpdateUserAndLogout(client, username, data.password, props);
    } catch (error: any) {
      setError('confirmPassword', {
        type: 'server',
        message: error.message,
      });
    }
  });
  return (
    <SurfaceTemplate>
      <PasswordInput control={control} errors={errors} />
      <PasswordConfirmInput control={control} errors={errors} watch={watch} />
      <ButtonTemplate onPress={onSubmit}>
        Changer mon mot de passe
      </ButtonTemplate>
    </SurfaceTemplate>
  );
}
