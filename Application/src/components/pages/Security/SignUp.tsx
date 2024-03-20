import React, { ReactNode } from 'react';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { useApolloClient } from '@apollo/client';
import { SignUpUser } from '../../../controllers/AuthenticationController';
import { StackParamList } from '../../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import UsernameInput from '../../atoms/styles/UsernameInput';
import PasswordConfirmInput from '../../atoms/styles/PasswordConfirmInput';
import { StyleSheet, View } from 'react-native';
import TextTemplate from '../../atoms/styles/TextTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import PasswordInputRandomized from "../../atoms/styles/PasswordInputRandomized";

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
    <View style={styles.mainContainer}>
      <SurfaceTemplate>
        <View style={{ flexShrink: 1 }}>
          <TextTemplate
            style={[styles.center, { marginBottom: 50 }]}
            variant="headlineMedium"
          >
            Inscription
          </TextTemplate>
        </View>
        <View style={{ flexShrink: 1 }}>
          <UsernameInput
            style={styles.margin}
            control={control}
            errors={errors}
          />
          <PasswordInputRandomized
            style={styles.margin}
            control={control}
            errors={errors}
          />
          <PasswordConfirmInput
            style={styles.margin}
            control={control}
            errors={errors}
            watch={watch}
          />
        </View>
        <View style={{ flexShrink: 2 }}>
          <ButtonTemplate
            style={{ marginTop: 50 }}
            theme={buttonTheme}
            onPress={onSubmit}
          >
            Inscription
          </ButtonTemplate>
        </View>
      </SurfaceTemplate>
      <View style={{ marginTop: 25 }}>
        <TextTemplate variant="bodyLarge" style={styles.center}>
          Vous avez déjà un compte ?
        </TextTemplate>
        <ButtonTemplate
          onPress={() => props.navigation.navigate('Connexion')}
          mode="outlined"
          style={{ alignSelf: 'center' }}
          theme={buttonTheme}
        >
          Se connecter
        </ButtonTemplate>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 75,
  },
  center: {
    textAlign: 'center',
  },
  margin: {
    marginVertical: 5,
  },
});

const buttonTheme = {
  colors: { primary: theme.colors.tertiary, outline: theme.colors.tertiary },
};
