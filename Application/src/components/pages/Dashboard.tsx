import SurfaceTemplate from '../molecules/SurfaceTemplate';
import AppTemplate from '../atoms/AppTemplate';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/RootStack';
import {
  GetLoggedUser,
  LogoutUser,
} from '../../controllers/AuthenticationController';
import {ReactNode, useEffect} from 'react';
import {ApolloConsumer, useApolloClient} from '@apollo/client';
import {
  CreateAgendaEvent, DeleteAgendaEvent,
  GetAgendaEvent,
  GetAllAgendaEvents,
  UpdateAgendaEvent
} from "../../controllers/AgendaController";

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

  const client = useApolloClient();
  let id: string = '';
  useEffect(() => {
    async function doThings() {
      console.log('create event');
      await CreateAgendaEvent(
          client,
          'test',
          'test',
          new Date(),
          new Date(),
          'Noir'
      ).then(eventId => {
        console.log('created event = ', eventId);
        id = eventId;
      });
      console.log('get event');
      GetAgendaEvent(client, id).then(event => {
        console.log('get event = ', event);
      });
      console.log('update event');
      UpdateAgendaEvent(
          client,
          id,
          'test2',
          'test2',
          new Date(),
          new Date(),
          'Noir'
      ).then(event => {
        console.log('updated event = ', event);
      });
      console.log('get all events');
      GetAllAgendaEvents(client).then(events => {
        console.log('get all events = ', events);
      });
      console.log('delete event');
      DeleteAgendaEvent(client, id).then(event => {
        console.log('deleted event = ', event);
      });
      console.log('get all events');
      GetAllAgendaEvents(client).then(events => {
        console.log('get all events = ', events);
      });
    }
    doThings();
  }, []);

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
            onPress={() => props.navigation.navigate('Agenda')}
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
