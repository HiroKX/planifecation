import { ApolloClient, gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation createUser($login: String!, $password: String!) {
    createUser(login: $login, password: $password) {
      id
    }
  }
`;

const LOG_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export async function CreateUser(
  client: Readonly<ApolloClient<Object>>,
  login: Readonly<string>,
  password: Readonly<string>
): Promise<number> {
  console.debug('AuthenticationService.CreateUser');

  return client
    .mutate({
      mutation: CREATE_USER,
      variables: {
        login: login,
        password: password,
      },
    })
    .then((response: any) => {
      return response.data.createUser.id;
    })
    .catch((error: any) => {
      console.error('SignUp error:', error);
      return 0;
    });
}

export async function LogUser(
  client: Readonly<ApolloClient<Object>>,
  login: Readonly<string>,
  password: Readonly<string>
): Promise<string> {
  console.debug('AuthenticationService.LogUser');

  return client
    .mutate({
      mutation: LOG_USER,
      variables: {
        username: login,
        password: password,
      },
    })
    .then((response: any) => {
      return response.data.login;
    })
    .catch((error: any) => {
      console.error('Login error:', error);
      return '';
    });
}
