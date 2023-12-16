import { ReactNode, useState } from 'react';
import SurfaceTemplate from '../molecules/SurfaceTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { ApolloConsumer } from '@apollo/client';
import { SignUpUser } from '../../controllers/AuthenticationController';
import { StackParamList } from '../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<StackParamList>;

export default function SignUp(props: Readonly<Props>): ReactNode {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ApolloConsumer>
      {client => (
        <SurfaceTemplate>
          <TextInputTemplate
            label="Adresse mail"
            value={username}
            onChangeText={text => setUsername(text)}
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
              await SignUpUser(client, username, password, props);
            }}
          >
            M'inscrire
          </ButtonTemplate>
        </SurfaceTemplate>
      )}
    </ApolloConsumer>
  );
}
