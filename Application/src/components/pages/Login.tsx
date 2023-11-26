import { useState } from 'react';
import SurfaceTemplate from '../organisms/SurfaceTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { ApolloConsumer } from '@apollo/client';
import { LogUser } from '../../services/AuthenticationService';

async function handleClick(
  client: any,
  login: string,
  password: string,
  navigation: any
) {
  await LogUser({ client, login, password }).then(token => {
    if (token != '') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    }
  });
}

export default function Login({ navigation }: any) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ApolloConsumer>
      {client => (
        <SurfaceTemplate>
          <TextInputTemplate
            label="Identifiant"
            value={login}
            onChangeText={text => setLogin(text)}
          />
          <TextInputTemplate
            label="Mot de passe"
            mode="outlined"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
          <ButtonTemplate
            onPress={async () => {
              await handleClick(client, login, password, navigation);
            }}
          >
            Se connecter
          </ButtonTemplate>
        </SurfaceTemplate>
      )}
    </ApolloConsumer>
  );
}
