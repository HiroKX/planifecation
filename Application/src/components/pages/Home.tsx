import { StyleSheet, View } from 'react-native';
import SurfaceTemplate from '../organisms/SurfaceTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { StackParamList } from '../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GetLoggedUser } from '../../controllers/AuthenticationController';
import { ReactNode } from 'react';
import { ENVIRONMENT } from '@env';

type Props = NativeStackScreenProps<StackParamList>;

export default function Home({ navigation }: Readonly<Props>): ReactNode {
  GetLoggedUser().then(user => {
    if (user.username != null && user.token != null) {
      console.log('Welcome back ', user.username);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    }
  });

  return (
    <View>
      <SurfaceTemplate style={styles.container}>
        <ButtonTemplate
          onPress={() => {
            navigation.navigate('Connexion');
          }}
        >
          Connexion
        </ButtonTemplate>
        <ButtonTemplate
          onPress={() => navigation.navigate('Inscription')}
          mode="outlined"
        >
          Inscription
        </ButtonTemplate>
        {ENVIRONMENT == 'dev' ? (
          <ButtonTemplate onPress={() => navigation.navigate('Sandbox')}>
            Theme Sandbox
          </ButtonTemplate>
        ) : null}
      </SurfaceTemplate>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
  },
  container: {
    alignItems: 'center',
  },
});
