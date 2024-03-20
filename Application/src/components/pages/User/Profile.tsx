import React, { useState, useEffect, ReactNode } from 'react';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { useApolloClient } from '@apollo/client';
import { GetLoggedUser } from '../../../controllers/AuthenticationController';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import { UpdateUserAndLogout } from '../../../controllers/UserController';
import { useForm } from 'react-hook-form';
import PasswordConfirmInput from '../../atoms/styles/PasswordConfirmInput';
import { StyleSheet } from 'react-native';
import { theme } from '../../organisms/OwnPaperProvider';
import { Text as PaperText } from 'react-native-paper';
import PasswordInputRandomized from "../../atoms/styles/PasswordInputRandomized";

type Props = NativeStackScreenProps<StackParamList>;
type FormValues = {
  password: string;
  confirmPassword: string;
};
export default function Profile(props: Readonly<Props>): ReactNode {
  const [username, setUsername] = useState('');
  useEffect(() => {
    async function getLoggedUserProfile() {
      await GetLoggedUser().then(user => {
        setUsername(user.username);
      });
    }
    getLoggedUserProfile();
  }, []);
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

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
    <SurfaceTemplate style={styles.template}>
      <PaperText style={styles.surfaceTitle}>Modifier mon profil</PaperText>
      <PasswordInputRandomized control={control} errors={errors} />
      <PasswordConfirmInput control={control} errors={errors} watch={watch} />
      <ButtonTemplate
        style={styles.button}
        onPress={onSubmit}
        textColor="white"
      >
        Changer mon mot de passe
      </ButtonTemplate>
    </SurfaceTemplate>
  );
}

const styles = StyleSheet.create({
  template: {
    padding: 20,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 18,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    backgroundColor: theme.colors.error,
  },
  surfaceTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
});
