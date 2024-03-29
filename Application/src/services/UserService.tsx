import { ApolloClient, ApolloError, gql } from '@apollo/client';
import { RelogUser } from '../controllers/AuthenticationController';

const DELETE_USER = gql`
  mutation DeleteUser($username: String!) {
    deleteUser(username: $username) {
      id
    }
  }
`;

export async function DeleteUser(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>
): Promise<boolean> {
  console.debug('AuthenticationService.DeleteUser');

  return client
    .mutate({
      mutation: DELETE_USER,
      variables: {
        username: username,
      },
    })
    .then(() => {
      console.debug('Deleted user', username);
      return true;
    })
    .catch(async (error: ApolloError) => {
      console.error('DeletUser error:', error);
      if (error.message.includes('UNAUTHENTICATED')) {
        let res = await RelogUser(client);
        if (res) return DeleteUser(client, username);
      }
      return false;
    });
}

const UPDATE_USER = gql`
  mutation UpdateUser($username: String!, $password: String!) {
    updateUser(username: $username, password: $password) {
      username
    }
  }
`;

export async function UpdateUser(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>,
  password: Readonly<string>
): Promise<boolean> {
  console.debug('AuthenticationService.UpdateUser');

  return client
    .mutate({
      mutation: UPDATE_USER,
      variables: {
        username: username,
        password: password,
      },
    })
    .then(() => {
      console.debug('User updated', username);
      return true;
    })
    .catch(async (error: ApolloError) => {
      console.error('UpdateUser error:', error);
      if (error.message.includes('UNAUTHENTICATED')) {
        let res = await RelogUser(client);
        if (res) return UpdateUser(client, username, password);
      }
      return false;
    });
}
