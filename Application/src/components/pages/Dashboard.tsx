import SurfaceTemplate from '../molecules/SurfaceTemplate';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
import * as Haptics from 'expo-haptics';

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
            <TouchableOpacity
              style={styles.rowflex}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                props.navigation.navigate('Liste des notes');
              }}
            >
              <AppTemplate customSize={80} icon="note-outline" />
              <TextTemplate variant="headlineMedium" style={styles.text}>
                Bloc-notes
              </TextTemplate>
            </TouchableOpacity>
          </SurfaceTemplate>
          <SurfaceTemplate style={[styles.surfaces]}>
            <TouchableOpacity
              style={[styles.rowflex, styles.endflex]}
              onPress={async () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                console.debug('Retrieving events');
                const events = await getAgendaEvents(client);
                console.debug('Events retrieved');
                props.navigation.navigate('Agenda', { events });
              }}
            >
              <TextTemplate variant="headlineMedium" style={styles.text}>
                Agenda
              </TextTemplate>
              <AppTemplate customSize={80} icon="calendar-cursor" />
            </TouchableOpacity>
          </SurfaceTemplate>
          <SurfaceTemplate style={styles.surfaces}>
            <TouchableOpacity
              style={styles.rowflex}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                props.navigation.navigate('Liste toute douce');
              }}
            >
              <AppTemplate customSize={80} icon="format-list-checkbox" />
              <TextTemplate variant="headlineMedium" style={styles.text}>
                Liste toute douce
              </TextTemplate>
            </TouchableOpacity>
          </SurfaceTemplate>
          <SurfaceTemplate style={styles.surfaces}>
            <TouchableOpacity
              style={[styles.rowflex, styles.endflex]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                props.navigation.navigate('Mini-Jeu');
              }}
            >
              <TextTemplate variant="headlineMedium" style={styles.text}>
                Mini-Jeu
              </TextTemplate>
              <AppTemplate customSize={80} icon="rotate-orbit" />
            </TouchableOpacity>
          </SurfaceTemplate>
          <SurfaceTemplate style={[styles.surfaces]}>
            <TouchableOpacity
              style={[styles.rowflex]}
              onPress={async () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                await LogoutUser(client, props);
              }}
            >
              <AppTemplate customSize={80} icon="door-sliding" />
              <TextTemplate variant="headlineMedium" style={styles.text}>
                Déconnexion
              </TextTemplate>
            </TouchableOpacity>
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
  rowflex: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  endflex: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  text: {
    margin: 'auto',
    color: theme.colors.secondary,
  },
});
