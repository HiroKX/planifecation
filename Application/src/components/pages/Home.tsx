import { StyleSheet, View } from 'react-native';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { StackParamList } from '../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  GetLoggedUser,
  IsLoggedUser,
  updateClientToken,
} from '../../controllers/AuthenticationController';
import { ReactNode, useState, useEffect } from 'react';
import { ENVIRONMENT } from '@env';
import { useApolloClient } from '@apollo/client';
import { theme } from '../organisms/OwnPaperProvider';
import LogoTemplate from '../atoms/styles/LogoTemplate';
import TextTemplate from '../atoms/styles/TextTemplate';

type Props = NativeStackScreenProps<StackParamList>;

export default function Home({ navigation }: Readonly<Props>): ReactNode {
  const client = useApolloClient();
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    async function checkLogged() {
      setIsLogged(await IsLoggedUser());
    }
    checkLogged();
  }, []);
  if (isLogged) {
    GetLoggedUser().then(user => {
      console.log('Welcome back ', user.username);
      updateClientToken(client, user.token);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    });
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <LogoTemplate style={styles.logo} />
      </View>
      <View style={styles.container}>
        <TextTemplate style={styles.textStyle}>
          Waouh quel slogan inspirant !
        </TextTemplate>
      </View>
      <View style={[styles.container]}>
        <ButtonTemplate
          style={styles.button}
          onPress={() => navigation.navigate('Connexion')}
        >
          Se connecter
        </ButtonTemplate>
        <ButtonTemplate
          style={styles.button}
          onPress={() => navigation.navigate('Inscription')}
          mode="outlined"
        >
          S'inscrire
        </ButtonTemplate>
      </View>
      {ENVIRONMENT === 'test' ? (
        <View style={[styles.container]}>
          <ButtonTemplate onPress={() => navigation.navigate('Sandbox')}>
            Theme Sandbox
          </ButtonTemplate>
          <ButtonTemplate onPress={() => navigation.navigate('Test SKIA')}>
            Test SKIA
          </ButtonTemplate>
          <ButtonTemplate onPress={() => navigation.navigate('Test Gyro')}>
            Test Gyro
          </ButtonTemplate>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 75,
  },
  container: {
    flexDirection: 'row',
  },
  logo: {
    height: 400,
    width: 400,
  },
  textStyle: {
    color: theme.colors.primary,
    fontSize: 44,
    fontFamily: 'Pattaya',
    letterSpacing: 2,
    textAlign: 'center',
    textAlignVertical: 'top',
  },

  button: {
    flex: 1,
    borderRadius: 50,
    margin: 10,
    height: 60,
    justifyContent: 'center',
  },
});
