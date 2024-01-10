import { useState, useEffect, ReactNode } from 'react';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { useApolloClient } from '@apollo/client';
import { GetLoggedUser } from '../../../controllers/AuthenticationController';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import { UpdateUserAndLogout } from '../../../controllers/UserController';
import { Controller, useForm } from 'react-hook-form';
import { HelperText } from 'react-native-paper';

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
      <Controller
        control={control}
        rules={{
          required: 'Ce champ est requis.',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInputTemplate
              label="Mot de passe"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={true}
            />
            {errors.password?.type === 'required' && (
              <HelperText type={'error'}>Ce champ est requis.</HelperText>
            )}
          </>
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: 'Ce champ est requis.',
          validate: (val: string) => {
            if (watch('password') != val) {
              return 'Les mots de passe de ne correspondent pas.';
            }
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInputTemplate
              label="Confirmer le mot de passe"
              value={value}
              onChangeText={onChange}
              secureTextEntry={true}
              onBlur={onBlur}
            />
            {errors.confirmPassword && (
              <HelperText type={'error'}>
                {errors.confirmPassword?.message}
              </HelperText>
            )}
          </>
        )}
        name="confirmPassword"
      />
      <ButtonTemplate onPress={onSubmit}>
        Changer mon mot de passe
      </ButtonTemplate>
    </SurfaceTemplate>
  );
}
