import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReactNode } from 'react';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import SignUp from '../components/pages/SignUp';
import Dashboard from '../components/pages/Dashboard';
import Settings from '../components/pages/Settings';
import Notepad from '../components/pages/Notepad';

import SettingsButton from '../components/atoms/SettingsButton';
import ThemeSandbox from '../components/pages/ThemeSandbox';
import { navigationTheme } from '../components/organisms/OwnPaperProvider';

export type StackParamList = {
  Accueil: undefined;
  Connexion: undefined;
  Inscription: undefined;
  Paramètres: undefined;
  Dashboard: undefined;
  'Bloc-notes': undefined;
  Sandbox: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

function RootStack(): ReactNode {
  return (
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
      <Stack.Screen name="Inscription" component={SignUp} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Paramètres" component={Settings} />
      <Stack.Screen name="Bloc-notes" component={Notepad} />
      <Stack.Screen name="Sandbox" component={ThemeSandbox} />
    </Stack.Navigator>
  );
}

export default RootStack;
