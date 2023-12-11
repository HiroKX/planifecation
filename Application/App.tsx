import { NavigationContainer } from '@react-navigation/native';
import OwnPaperProvider, {
  navigationTheme,
} from './src/components/organisms/OwnPaperProvider';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { URI_API, ENVIRONMENT } from '@env';
import RootStack from './src/navigation/RootStack';
import { StatusBar } from 'expo-status-bar';
import LocaleConfig from './src/environment/locale';
import { Portal } from 'react-native-paper';

LocaleConfig.defaultLocale = 'fr';

export default function App() {
  if (ENVIRONMENT != 'dev') console.debug = () => {};

  const client = new ApolloClient({
    link: new HttpLink({ uri: URI_API }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <OwnPaperProvider>
        <Portal>
        <NavigationContainer theme={navigationTheme}>
          <RootStack />
        </NavigationContainer>
        </Portal>
      </OwnPaperProvider>
      <StatusBar style="light" />
    </ApolloProvider>
  );
}
