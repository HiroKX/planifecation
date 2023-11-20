import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/pages/Home';
import Login from './src/components/pages/Login';
import SignUp from './src/components/pages/SignUp';
import Dashboard from './src/components/pages/Dashboard';
import LogoService from './src/services/LogoService';
import { mainTheme } from './src/environment/themes';
import { PaperProvider } from 'react-native-paper';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { URI_API } from "@env";

const Stack = createNativeStackNavigator();

export default function App() {
    const client = new ApolloClient({
        uri: URI_API,
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <PaperProvider theme={mainTheme}>
                <NavigationContainer theme={mainTheme}>
                    <Stack.Navigator
                        initialRouteName='Accueil'
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
                        <Stack.Screen name="Dashboard" component={Dashboard}/>
                   </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </ApolloProvider>
    );
}