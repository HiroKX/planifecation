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
import { getAgendaEvents } from './Agenda/CalendarTemplate';

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
            icon="note-outline"
            label="Liste des notes"
            onPress={() => props.navigation.navigate('Liste des notes')}
          />
          <AppTemplate
            icon="calendar-cursor"
            label="Agenda"
            onPress={async () => {
              console.debug('Retrieving events');
              const events = await getAgendaEvents(client);
              console.debug('Events retrieved');
              props.navigation.navigate('Agenda', { events });
            }}
          />
          <AppTemplate
            icon="format-list-checkbox"
            label="Liste toute douce"
            onPress={() => props.navigation.navigate('Liste toute douce')}
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
