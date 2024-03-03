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
import { View, StyleSheet } from 'react-native';
import TextTemplate from '../../atoms/styles/TextTemplate';
import { theme } from '../../organisms/OwnPaperProvider';

type Props = NativeStackScreenProps<StackParamList>;
type FormValues = {
  username: string;
  password: string;
};

export default function Login({ navigation }: Readonly<Props>): ReactNode {
  const {
    control,
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
    <View style={styles.mainContainer}>
      <SurfaceTemplate>
        <View style={{ flexShrink: 1 }}>
          <TextTemplate
            style={[styles.center, { marginBottom: 50 }]}
            variant="headlineMedium"
          >
            Connexion
          </TextTemplate>
        </View>
        <View style={{ flexShrink: 1 }}>
          <UsernameInput
            style={styles.margin}
            control={control}
            errors={errors}
          />
          <PasswordInput
            style={styles.margin}
            control={control}
            errors={errors}
          />
        </View>
        <View style={{ flexShrink: 2 }}>
          <ButtonTemplate
            style={{ marginTop: 50 }}
            theme={buttonTheme}
            onPress={onSubmit}
          >
            Connexion
          </ButtonTemplate>
        </View>
      </SurfaceTemplate>
      <View style={{ marginTop: 25 }}>
        <TextTemplate variant="bodyLarge" style={styles.center}>
          Vous n'avez pas encore de compte ?
        </TextTemplate>
        <ButtonTemplate
          mode="outlined"
          style={{ alignSelf: 'center' }}
          theme={buttonTheme}
          onPress={() => navigation.navigate('Inscription')}
        >
          S'inscrire
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
