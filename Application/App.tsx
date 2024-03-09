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
import { View, StyleSheet } from 'react-native';
import { darkTheme, setDarkTheme } from './src/services/utils/utils';

export default function App(): ReactNode {
  if (ENVIRONMENT != 'dev' && ENVIRONMENT != 'test') console.debug = () => {};
  console.log(URI_API);
  console.log(ENVIRONMENT);

  const client = new ApolloClient({
    link: new HttpLink({ uri: URI_API }),
    cache: new InMemoryCache(),
  });

  const [splash, setSplash] = useState(true);

  return (
    <ApolloProvider client={client}>
      <OwnPaperProvider>
        {splash ? (
          <Splashscreen func={() => setSplash(false)}></Splashscreen>
        ) : (
          <NavigationContainer theme={navigationTheme}>
            {darkTheme.value ? <View style={styles.darkThemeOn}></View> : null}
            <RootStack />
          </NavigationContainer>
        )}
      </OwnPaperProvider>
      {/* Status Bar à modifier encore selon le thème  */}
      <StatusBar style="light" />
    </ApolloProvider>
  );
}
const styles = StyleSheet.create({
  darkThemeOn:{
    position:'absolute',
    height:9999,
    width:9999,
    backgroundColor:'black',
    opacity:0.9,
    zIndex:100,
  },
});
