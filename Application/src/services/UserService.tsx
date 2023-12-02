import { ApolloClient, gql } from '@apollo/client';

const DELETE_USER = gql`
  mutation DeleteUser($username: String!) {
    deleteUser(username: $username)
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
    .then((response: any) => {
      console.debug('Deleted user', username);
      return true;
    })
    .catch((error: any) => {
      console.error('DeleteUser error:', error);
      return false;
    });
}
