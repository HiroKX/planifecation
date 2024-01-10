import { ReactNode } from 'react';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { ApolloConsumer, useApolloClient } from '@apollo/client';
import { SignUpUser } from '../../../controllers/AuthenticationController';
import { StackParamList } from '../../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';

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
    reset,
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
    <ApolloConsumer>
      {client => (
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
                  <HelperText type={'error'}>
                    {errors.username?.message}
                  </HelperText>
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
          <ButtonTemplate onPress={onSubmit}>M'inscrire</ButtonTemplate>
        </SurfaceTemplate>
      )}
    </ApolloConsumer>
  );
}
