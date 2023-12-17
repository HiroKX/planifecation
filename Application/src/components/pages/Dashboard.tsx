import SurfaceTemplate from '../molecules/SurfaceTemplate';
import AppTemplate from '../atoms/AppTemplate';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/RootStack';
import {
  GetLoggedUser,
  LogoutUser,
} from '../../controllers/AuthenticationController';
import { ReactNode } from 'react';
import { ApolloConsumer } from '@apollo/client';

type Props = NativeStackScreenProps<StackParamList>;

export default function Dashboard(props: Readonly<Props>): ReactNode {
  GetLoggedUser().then(user => {
    if (user.username == '' || user.token == '') {
      console.error('No user logged in.');
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Accueil' }],
      });
    }
  });

  return (
    <ApolloConsumer>
      {client => (
        <SurfaceTemplate>
          <AppTemplate
            icon="door-sliding"
            label="Bloc-notes"
            onPress={() => props.navigation.navigate('Bloc-notes')}
          />
          <AppTemplate
            icon="calendar-cursor"
            label="Agenda"
            onPress={() => props.navigation.navigate('Agenda')}
          />
          <AppTemplate
            icon="door-sliding"
            label="Déconnexion"
            onPress={async () => {
              await LogoutUser(client, props);
            }}
          />
        </SurfaceTemplate>
      )}
    </ApolloConsumer>
  );
}
