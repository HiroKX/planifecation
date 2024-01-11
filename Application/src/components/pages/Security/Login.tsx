import { ReactNode } from 'react';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { useApolloClient } from '@apollo/client';
import { SignInUser } from '../../../controllers/AuthenticationController';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import PasswordInput from '../../atoms/styles/PasswordInput';
import UsernameInput from '../../atoms/styles/UsernameInput';
import { useForm } from 'react-hook-form';

type Props = NativeStackScreenProps<StackParamList>;
type FormValues = {
  username: string;
  password: string;
};

export default function Login(props: Readonly<Props>): ReactNode {
  const { control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });


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
      <UsernameInput control={control} errors={errors} />
      <PasswordInput control={control} errors={errors} />
      <ButtonTemplate onPress={onSubmit}>Me connecter</ButtonTemplate>
    </SurfaceTemplate>
  );
}
