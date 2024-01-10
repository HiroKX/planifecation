import { ReactNode } from 'react';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { useApolloClient } from '@apollo/client';
import { SignInUser } from '../../../controllers/AuthenticationController';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import { Controller, useForm } from 'react-hook-form';
import { HelperText } from 'react-native-paper';

type Props = NativeStackScreenProps<StackParamList>;
type FormValues = {
  username: string;
  password: string;
};

export default function Login(props: Readonly<Props>): ReactNode {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const {
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const client = useApolloClient();

  const onSubmit = handleSubmit(async data => {
    try {
      await SignInUser(client, data.username, data.password, props);
    } catch (error: any) {
      setError('username', {
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
              label="Nom d'utilisateur"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.username && (
              <HelperText type={'error'}>{errors.username?.message}</HelperText>
            )}
          </>
        )}
        name="username"
      />
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
      <ButtonTemplate onPress={onSubmit}>Me connecter</ButtonTemplate>
    </SurfaceTemplate>
  );
}
