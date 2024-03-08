import SurfaceTemplate from '../molecules/SurfaceTemplate';
import { StyleSheet, View } from 'react-native';
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
import TextTemplate from '../atoms/styles/TextTemplate';
import { theme } from '../organisms/OwnPaperProvider';

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
        <View style={styles.mainContainer}>
          <SurfaceTemplate style={styles.surfaces}>
            <AppTemplate
              customSize={80}
              icon="note-outline"
              elevation={5}
              onPress={() => props.navigation.navigate('Liste des notes')}
            />
            <TextTemplate variant="headlineLarge" style={styles.text}>
              Bloc-notes
            </TextTemplate>
          </SurfaceTemplate>
          <SurfaceTemplate style={[styles.surfaces, styles.endflex]}>
            <TextTemplate variant="headlineLarge" style={styles.text}>
              Agenda
            </TextTemplate>
            <AppTemplate
              customSize={80}
              icon="calendar-cursor"
              elevation={5}
              onPress={async () => {
                console.debug('Retrieving events');
                const events = await getAgendaEvents(client);
                console.debug('Events retrieved');
                props.navigation.navigate('Agenda', { events });
              }}
            />
          </SurfaceTemplate>
          <SurfaceTemplate style={styles.surfaces}>
            <AppTemplate
              customSize={80}
              icon="format-list-checkbox"
              elevation={5}
              onPress={() => props.navigation.navigate('Liste toute douce')}
            />
            <TextTemplate variant="headlineLarge" style={styles.text}>
              Liste toute douce
            </TextTemplate>
          </SurfaceTemplate>
          <SurfaceTemplate style={[styles.surfaces, styles.endflex]}>
            <TextTemplate variant="headlineLarge" style={styles.text}>
              Déconnexion
            </TextTemplate>
            <AppTemplate
              customSize={80}
              icon="door-sliding"
              elevation={5}
              onPress={async () => {
                await LogoutUser(client, props);
              }}
            />
          </SurfaceTemplate>
        </View>
      )}
    </ApolloConsumer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
  },
  surfaces: {
    margin: 15,
    borderRadius: 18,
    flexDirection: 'row',
  },
  endflex: {
    justifyContent: 'flex-end',
  },
  text: {
    color: theme.colors.tertiary,
    textAlignVertical: 'center',
  },
});
