import { useState, useEffect, ReactNode } from 'react';
import SurfaceTemplate from '../molecules/SurfaceTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { ApolloConsumer } from '@apollo/client';
import { GetLoggedUser } from '../../controllers/AuthenticationController';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/RootStack';
import TextTemplate from '../atoms/styles/TextTemplate';
import { UpdateUserAndLogout } from '../../controllers/UserController';

type Props = NativeStackScreenProps<StackParamList>;

export default function Profile(props: Readonly<Props>): ReactNode {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    async function getLoggedUser() {
      await GetLoggedUser().then(user => {
        setUsername(user.username);
      });
    }
    getLoggedUser();
  }, []);

  return (
    <ApolloConsumer>
      {client => (
        <SurfaceTemplate>
          <TextTemplate>Votre nom d'utilisateur : {username}</TextTemplate>
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
              if (password == confirmPassword)
                //TODO : demander une confirmation
                await UpdateUserAndLogout(client, username, password, props); // TODO : Traitement avec form
            }}
          >
            Changer le mot de passe
          </ButtonTemplate>
        </SurfaceTemplate>
      )}
    </ApolloConsumer>
  );
}
