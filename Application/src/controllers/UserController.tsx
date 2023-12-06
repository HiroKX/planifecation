import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/RootStack';
import { ApolloClient } from '@apollo/client';
import { DeleteUser, UpdateUser } from '../services/UserService';
import { GetLoggedUserUsername, LogoutUser } from './AuthenticationController';

type Props = NativeStackScreenProps<StackParamList>;

export async function DeleteAndLogoutUser(
  client: Readonly<ApolloClient<Object>>,
  props: Readonly<Props>
): Promise<void> {
  console.debug('AuthenticationController.DeleteAndLogoutUser');
  const username = await GetLoggedUserUsername();
  if (username != '') {
    await DeleteUser(client, username)
      .then(async res => {
        if (res) {
          console.log('User', username, 'successfully deleted');
          await LogoutUser(client, props);
        } else throw new Error();
      })
      .catch(error => {
        console.error('Error while deleting user');
      });
  } else {
    console.error('No user logged in.');
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Accueil' }],
    });
  }
}

export async function UpdateUserAndLogout(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>,
  password: Readonly<string>,
  props: Readonly<Props>
): Promise<void> {
  console.debug('UserController.UpdateUser');
  if (username != '' && password != '') {
    await UpdateUser(client, username, password)
      .then(async res => {
        if (res) {
          console.log('User', username, 'successfully updated');
          await LogoutUser(client, props);
        } else throw new Error();
      })
      .catch(error => {
        console.error('Error while updated user');
      });
  } else {
    console.error('No user logged in.');
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Accueil' }],
    });
  }
}
