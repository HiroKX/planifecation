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
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store/EventsSlice';
import { ReactNode, useState } from 'react';
import Splashscreen from './src/components/pages/Splashscreen';

LocaleConfig.defaultLocale = 'fr'; // loads french equivalent of label in calendar and timeline

export default function App(): ReactNode {
  if (ENVIRONMENT != 'dev') console.debug = () => {};

  const client = new ApolloClient({
    link: new HttpLink({ uri: URI_API }),
    cache: new InMemoryCache(),
  });

  const [splash, setSplash] = useState(true);

  return splash ? (
    <Splashscreen func={() => setSplash(false)}></Splashscreen>
  ) : (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <OwnPaperProvider>
          <NavigationContainer theme={navigationTheme}>
            <RootStack />
          </NavigationContainer>
        </OwnPaperProvider>
        <StatusBar style="light" />
      </ReduxProvider>
    </ApolloProvider>
  );
}
