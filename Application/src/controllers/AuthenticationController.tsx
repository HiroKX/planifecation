import { CreateUser, LogUser } from '../services/AuthenticationService';
import * as SecureStore from 'expo-secure-store';

// ---------------- METIER ----------------

export async function SignUpUser(
  client: any,
  login: string,
  password: string,
  navigation: any
) {
  console.debug('AuthenticationController.SignUpUser');
  await CreateUser({ client, login, password })
    .then(async userId => {
      if (userId != 0) {
        console.log('User', userId, 'created with login ', login);
        await SignInUser(client, login, password, navigation);
      }
    })
    .catch(error => {
      console.error('Error while creating user: ', error);
    });
}

export async function SignInUser(
  client: any,
  login: string,
  password: string,
  navigation: any
) {
  console.debug('AuthenticationController.SignInUser');
  await LogUser({ client, login, password })
    .then(async token => {
      if (token != '') {
        await SetLoggedUser(login, token);
        console.log('User', login, 'successfully logged in');
        navigation.reset({
          index: 0,
          routes: [
            { name: 'Dashboard', params: { username: login, token: token } },
          ],
        });
      }
    })
    .catch(error => {
      console.error('Error while logging user: ', error);
    });
}

export async function LogoutUser(navigation: any) {
  console.debug('AuthenticationController.LogoutUser');
  await SecureStore.deleteItemAsync('loggedUser');
  await SecureStore.deleteItemAsync('loggedUserToken');
  console.log('User successfully logged out');
  navigation.reset({
    index: 0,
    routes: [{ name: 'Accueil' }],
  });
}

// ---------------- GETTERS / SETTER ----------------

export async function GetLoggedUser() {
  console.debug('AuthenticationController.GetLoggedUser');
  const username = await SecureStore.getItemAsync('loggedUser');
  const token = await SecureStore.getItemAsync('loggedUserToken');

  return { username, token };
}

export async function GetLoggedUserUsername() {
  console.debug('AuthenticationController.GetLoggedUserUsername');
  return await SecureStore.getItemAsync('loggedUser');
}

export async function GetLoggedUserToken() {
  console.debug('AuthenticationController.GetLoggedUserToken');
  return await SecureStore.getItemAsync('loggedUserToken');
}

async function SetLoggedUser(username: string, token: string) {
  console.debug('AuthenticationController.SetLoggedUser');
  await SecureStore.setItemAsync('loggedUser', username);
  await SecureStore.setItemAsync('loggedUserToken', token);
}
