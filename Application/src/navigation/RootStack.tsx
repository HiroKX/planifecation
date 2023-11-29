import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReactNode } from 'react';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import SignUp from '../components/pages/SignUp';
import Dashboard from '../components/pages/Dashboard';
import Settings from '../components/pages/Settings';
import SettingsButton from '../components/atoms/SettingsButton';
import { navigationTheme } from '../components/organisms/OwnPaperProvider';

export type StackParamList = {
  Accueil: undefined;
  Connexion: undefined;
  Inscription: undefined;
  Paramètres: undefined;
  Dashboard: undefined;
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
    </Stack.Navigator>
  );
}

export default RootStack;
