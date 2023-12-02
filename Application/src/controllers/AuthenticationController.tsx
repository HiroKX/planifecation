import { CreateUser, LogUser } from '../services/AuthenticationService';
import * as SecureStore from 'expo-secure-store';
import { StackParamList } from '../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { URI_API } from '@env';

type Props = NativeStackScreenProps<StackParamList>;
// ---------------- METIER ----------------

export async function SignUpUser(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>,
  password: Readonly<string>,
  props: Readonly<Props>
): Promise<void> {
  console.debug('AuthenticationController.SignUpUser');
  await CreateUser(client, username, password)
    .then(async userId => {
      if (userId != 0) {
        console.log('User', userId, 'created with username ', username);
        await SignInUser(client, username, password, props);
      }
    })
    .catch(error => {
      console.error('Error while creating user: ', error);
    });
}

export async function SignInUser(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>,
  password: Readonly<string>,
  { navigation }: Readonly<Props>
): Promise<void> {
  console.debug('AuthenticationController.SignInUser');
  await LogUser(client, username, password)
    .then(async token => {
      if (token != '') {
        await SetLoggedUser(username, token);
        await updateClientToken(client, token);
        await client.resetStore();
        console.log('User', username, 'successfully logged in');
        navigation.reset({
          index: 0,
          routes: [
            { name: 'Dashboard', params: { username: username, token: token } },
          ],
        });
      }
    })
    .catch(error => {
      console.error('Error while logging user: ', error);
    });
}

export async function LogoutUser(
  client: Readonly<ApolloClient<Object>>,
  { navigation }: Readonly<Props>
): Promise<void> {
  console.debug('AuthenticationController.LogoutUser');
  await SecureStore.deleteItemAsync('loggedUser');
  await SecureStore.deleteItemAsync('loggedUserToken');
  updateClientToken(client, '');
  await client.resetStore();
  console.log('User successfully logged out');
  navigation.reset({
    index: 0,
    routes: [{ name: 'Accueil' }],
  });
}

export function updateClientToken(
  client: Readonly<ApolloClient<Object>>,
  token: Readonly<string>
): void {
  console.debug('AuthenticationController.updateClientToken');
  console.debug('token:', token);
  const httpLink = createHttpLink({
    uri: URI_API,
  });
  if (token != null && token != '') {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token,
        },
      };
    });
    client.setLink(authLink.concat(httpLink));
  } else {
    client.setLink(httpLink);
  }
}

// ---------------- GETTERS / SETTER ----------------

export async function GetLoggedUser(): Promise<{
  username: string;
  token: string;
}> {
  console.debug('AuthenticationController.GetLoggedUser');
  const username = (await SecureStore.getItemAsync('loggedUser')) ?? '';
  const token = (await SecureStore.getItemAsync('loggedUserToken')) ?? '';

  return { username, token };
}

export async function GetLoggedUserUsername(): Promise<string> {
  console.debug('AuthenticationController.GetLoggedUserUsername');
  return (await SecureStore.getItemAsync('loggedUser')) ?? '';
}

export async function GetLoggedUserToken(): Promise<string> {
  console.debug('AuthenticationController.GetLoggedUserToken');
  return (await SecureStore.getItemAsync('loggedUserToken')) ?? '';
}

async function SetLoggedUser(
  username: Readonly<string>,
  token: Readonly<string>
): Promise<void> {
  console.debug('AuthenticationController.SetLoggedUser');
  await SecureStore.setItemAsync('loggedUser', username);
  await SecureStore.setItemAsync('loggedUserToken', token);
}
