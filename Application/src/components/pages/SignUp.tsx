import { useState } from 'react';
import SurfaceTemplate from '../organisms/SurfaceTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { ApolloConsumer } from '@apollo/client';
import { CreateUser, LogUser } from '../../services/AuthenticationService';

async function onPress(client: any, login: string, password: string, navigation: any) {
    console.debug("SignUp.OnPress");
    await CreateUser({client, login, password}).then(async userId => {
        if (userId != 0) await LogUser({client, login, password}).then(token => {
            if (token != "") {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard', username: login, token: token }],
                });
            }
            else navigation.replace('Connexion');
        });
    })
}

export default function SignUp({ navigation }: any) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ApolloConsumer>
      {client => (
        <SurfaceTemplate>
          <TextInputTemplate
            label="Adresse mail"
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
          <TextInputTemplate
            label="Confirmer le mot de passe"
            mode="outlined"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={true}
          />
          <ButtonTemplate
            onPress={async () => {
              await onPress(client, login, password, navigation);
            }}
          >
            M'inscrire
          </ButtonTemplate>
        </SurfaceTemplate>
      )}
    </ApolloConsumer>
  );
}
