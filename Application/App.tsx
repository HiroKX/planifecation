import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mainTheme } from './src/environment/themes';
import { PaperProvider } from 'react-native-paper';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, } from '@apollo/client';
import { URI_API, ENVIRONMENT } from '@env';
import RootStack from './src/navigation/RootStack';

const Stack = createNativeStackNavigator();

export default function App() {
    if(ENVIRONMENT != "dev")
        console.debug = () => {};

    const client = new ApolloClient({
        uri: URI_API,
        link: new HttpLink({ uri: URI_API }),
        cache: new InMemoryCache(),
    });

    return (
      <ApolloProvider client={client}>
        <PaperProvider theme={mainTheme}>
          <NavigationContainer theme={mainTheme}>
            <RootStack />
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
    );
}
