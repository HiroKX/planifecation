import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReactNode } from 'react';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import SignUp from '../components/pages/SignUp';
import Dashboard from '../components/pages/Dashboard';
import Settings from '../components/pages/Settings';
import Agenda from '../components/pages/Agenda';

import SettingsButton from '../components/atoms/SettingsButton';
import ThemeSandbox from '../components/pages/ThemeSandbox';
import { navigationTheme } from '../components/organisms/OwnPaperProvider';
import Profile from '../components/pages/Profile';
import TodoList from '../components/pages/Todo/TodoList';
import NoteList from '../components/pages/Notes/NoteList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TestSKIA from '../components/pages/TestSKIA';

export type StackParamList = {
  Accueil: undefined;
  Connexion: undefined;
  Inscription: undefined;
  Paramètres: undefined;
  Dashboard: undefined;
  'Bloc-notes': undefined;
  Sandbox: undefined;
  Profil: undefined;
  Agenda: undefined;
  'Liste toute douce': undefined;
  'Test SKIA': undefined;
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
        }}
      >
        <Stack.Screen name="Accueil" component={Home} />
        <Stack.Screen name="Connexion" component={Login} />
        <Stack.Screen name="Profil" component={Profile} />
        <Stack.Screen name="Inscription" component={SignUp} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Paramètres" component={Settings} />
        <Stack.Screen name="Bloc-notes" component={NoteList} />
        <Stack.Screen name="Sandbox" component={ThemeSandbox} />
        <Stack.Screen name="Agenda" component={Agenda} />
        <Stack.Screen name="Liste toute douce" component={TodoList} />
        <Stack.Screen name="Test SKIA" component={TestSKIA} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}

export default RootStack;
