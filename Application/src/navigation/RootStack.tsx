import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReactNode } from 'react';
import Home from '../components/pages/Home';
import Login from '../components/pages/Security/Login';
import SignUp from '../components/pages/Security/SignUp';
import Dashboard from '../components/pages/Dashboard';
import Settings from '../components/pages/User/Settings';
import Appointments, {
  AgendaParams,
} from '../components/pages/Agenda/Appointments';
import SettingsButton from '../components/atoms/SettingsButton';
import ThemeSandbox from '../components/pages/ThemeSandbox';
import {
  baseFont,
  navigationTheme,
} from '../components/organisms/OwnPaperProvider';
import Profile from '../components/pages/User/Profile';
import TodoList from '../components/pages/Todo/TodoList';
import NoteList from '../components/pages/Notes/NoteList';
import NotePad, { NotepadParams } from '../components/pages/Notes/Notepad';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TestSKIA from '../components/pages/TestSKIA';
import GyroscopTest from '../components/organisms/GyroscopTest';
import Cgu from '../components/pages/Cgu';

export type StackParamList = {
  Accueil: undefined;
  Connexion: undefined;
  Inscription: undefined;
  Paramètres: undefined;
  Dashboard: undefined;
  'Bloc-Notes': NotepadParams | undefined;
  Sandbox: undefined;
  Profil: undefined;
  Agenda: AgendaParams;
  'Liste toute douce': undefined;
  'Test SKIA': undefined;
  'Liste des notes': undefined;
  'Mini-Jeu': undefined;
  CGU: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

function RootStack(): ReactNode {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Accueil"
        screenOptions={{
          headerStyle: {
            backgroundColor: navigationTheme.colors.primary,
          },
          headerTintColor: navigationTheme.colors.text,
          headerRight: SettingsButton,
          headerTitleStyle: {
            fontFamily: baseFont,
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen
          name="Accueil"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Connexion"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profil" component={Profile} />
        <Stack.Screen
          name="Inscription"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Paramètres" component={Settings} />
        <Stack.Screen name="Liste des notes" component={NoteList} />
        <Stack.Screen name="Bloc-Notes" component={NotePad} />
        <Stack.Screen name="Sandbox" component={ThemeSandbox} />
        <Stack.Screen name="Agenda" component={Appointments} />
        <Stack.Screen name="Liste toute douce" component={TodoList} />
        <Stack.Screen name="Test SKIA" component={TestSKIA} />
        <Stack.Screen name="Mini-Jeu" component={GyroscopTest} />
        <Stack.Screen name="CGU" component={Cgu} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}

export default RootStack;
