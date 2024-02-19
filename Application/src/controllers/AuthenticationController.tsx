import {
  CreateUser,
  LogUser,
  RelogUserService,
} from '../services/AuthenticationService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import * as SecureStore from 'expo-secure-store';
import { StackParamList } from '../navigation/RootStack';
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
      if (userId != -1) {
        console.log('User', userId, 'created with username ', username);
        await SignInUser(client, username, password, props);
      }
    })
    .catch(error => {
      console.error('Error while creating user: ', error);
      if (
        error.message.includes(
          'Unique constraint failed on the fields: (`username`)'
        )
      ) {
        throw new Error("Nom d'utilisateur déjà utilisé");
      }
      throw new Error("Erreur lors de la création de l'utilisateur");
    });
}

export async function SignInUser(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>,
  password: Readonly<string>,
  { navigation }: Readonly<Props>
): Promise<void> {
  console.debug('AuthenticationController.SignInUser');
  await LogUser(username, password)
    .then(async token => {
      console.log(token);
      if (token[0] != 'Not Logged !') {
        await SetLoggedUser(username, token[0], token[1]);
        await updateClientToken(client, token[0]);
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
      if (error.message.includes('Expected "payload" to be a plain object')) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
      }
      throw new Error("Erreur lors de la connexion de l'utilisateur");
    });
}

export async function RelogUser(
  client: Readonly<ApolloClient<Object>>
): Promise<boolean> {
  console.debug('AuthenticationController.RelogUser');
  const refreshToken =
    (await SecureStore.getItemAsync('loggedRefreshToken')) ?? '';
  return await RelogUserService(refreshToken)
    .then(async token => {
      console.log(token);
      if (token[0] != 'Not Logged !') {
        await UpdateLoggedUser(token[0], token[1]);
        await updateClientToken(client, token[0]);
        await client.resetStore();
      }
      return true;
    })
    .catch(error => {
      console.error('Error while logging user: ', error);
      if (error.message.includes('Expected "payload" to be a plain object')) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
      }
      throw new Error("Erreur lors de la connexion de l'utilisateur");
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
  navigation.reset({
    index: 0,
    routes: [{ name: 'Accueil' }],
  });
  console.log('User successfully logged out');
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
  refreshToken: string;
}> {
  console.debug('AuthenticationController.GetLoggedUser');
  const username = (await SecureStore.getItemAsync('loggedUser')) ?? '';
  const token = (await SecureStore.getItemAsync('loggedUserToken')) ?? '';
  const refreshToken =
    (await SecureStore.getItemAsync('loggedRefreshToken')) ?? '';
  return { username, token, refreshToken };
}

export async function UpdateLoggedUser(
  token: Readonly<string>,
  refreshToken: Readonly<string>
): Promise<void> {
  console.debug('AuthenticationController.UpdateLoggedUser');
  await SecureStore.setItemAsync('loggedUserToken', token);
  await SecureStore.setItemAsync('loggedRefreshToken', refreshToken);
}

export async function IsLoggedUser(): Promise<boolean> {
  console.debug('AuthenticationController.IsLoggedUser');
  const username = (await SecureStore.getItemAsync('loggedUser')) ?? '';
  const token = (await SecureStore.getItemAsync('loggedUserToken')) ?? '';
  if (token != '' && username != '') return true;
  return false;
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
  token: Readonly<string>,
  refreshToken: Readonly<string>
): Promise<void> {
  console.debug('AuthenticationController.SetLoggedUser');
  await SecureStore.setItemAsync('loggedUser', username);
  await SecureStore.setItemAsync('loggedUserToken', token);
  await SecureStore.setItemAsync('loggedRefreshToken', refreshToken);
}
