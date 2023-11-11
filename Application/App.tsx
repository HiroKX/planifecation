import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/pages/Home';
import Login from './src/components/pages/Login';
import SignUp from './src/components/pages/SignUp';
import LogoService from './src/services/LogoService';
import { mainTheme } from './src/environment/themes';
import { PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={mainTheme}>
      <NavigationContainer theme={mainTheme}>
      <Stack.Navigator 
          initialRouteName='Home'
          screenOptions={{
             headerStyle: {
               backgroundColor: mainTheme.colors.primary,
             },
             headerTintColor: '#fff',
             headerRight: () => ( <LogoService></LogoService>),
           }}
           >
         <Stack.Screen name="Accueil" component={Home}/>
         <Stack.Screen name="Connexion" component={Login}/>
         <Stack.Screen name="Inscription" component={SignUp}/>
       </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}