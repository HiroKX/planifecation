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
import { useState } from 'react';

LocaleConfig.defaultLocale = 'fr';

export default function App() {

  const [isLoading, setLoading] = useState(false);

  if (ENVIRONMENT != 'dev') console.debug = () => {};

  const client = new ApolloClient({
    link: new HttpLink({ uri: URI_API }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <OwnPaperProvider>
        <NavigationContainer theme={navigationTheme}>
          <RootStack />
        </NavigationContainer>
      </OwnPaperProvider>
      <StatusBar style="light" />
    </ApolloProvider>
  );
}
