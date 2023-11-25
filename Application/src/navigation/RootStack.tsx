import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReactNode } from 'react';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import SignUp from '../components/pages/SignUp';
import Dashboard from '../components/pages/Dashboard';
import LogoService from '../services/LogoService';
import { mainTheme } from '../environment/themes';

export type StackParamList = {
  Accueil: undefined;
  Connexion: undefined;
  Inscription: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

function RootStack(): ReactNode {
  return (
    <Stack.Navigator
      initialRouteName='Accueil'
      screenOptions={{
        headerStyle: {
          backgroundColor: mainTheme.colors.primary,
        },
        headerTintColor: '#fff',
        headerRight: () => (<LogoService></LogoService>),
      }}
    >
      <Stack.Screen name="Accueil" component={Home} />
      <Stack.Screen name="Connexion" component={Login} />
      <Stack.Screen name="Inscription" component={SignUp} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

export default RootStack;