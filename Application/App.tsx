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
import { ReactNode } from 'react';
import { useState } from 'react';
import LoadingTemplate from './src/components/molecules/LoadingTemplate';
import { DeviceEventEmitter } from 'react-native';

LocaleConfig.defaultLocale = 'fr'; // loads french equivalent of label in calendar and timeline

export default function App(): ReactNode {
  if (ENVIRONMENT != 'dev') console.debug = () => {};

  DeviceEventEmitter.addListener("load", (event : boolean) => {load(event)})

  const [isLoading, setIsLoading] = useState(false);

  function load(value : boolean) {
    setIsLoading(value);
  }

  const client = new ApolloClient({
    link: new HttpLink({ uri: URI_API }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <OwnPaperProvider>
          <NavigationContainer theme={navigationTheme}>
            <RootStack/>
          </NavigationContainer>
          <LoadingTemplate visible={isLoading}></LoadingTemplate>
        </OwnPaperProvider>
        <StatusBar style="light" />
      </ReduxProvider>
    </ApolloProvider>
  );
}
