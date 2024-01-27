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
import { ReactNode, useState } from 'react';
import Splashscreen from './src/components/pages/Splashscreen';

export default function App(): ReactNode {
  if (ENVIRONMENT != 'dev' && ENVIRONMENT != 'test') console.debug = () => {};
  console.log(URI_API);
  const client = new ApolloClient({
    link: new HttpLink({ uri: URI_API }),
    cache: new InMemoryCache(),
  });

  const [splash, setSplash] = useState(true);

  return splash ? (
    <Splashscreen func={() => setSplash(false)}></Splashscreen>
  ) : (
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
