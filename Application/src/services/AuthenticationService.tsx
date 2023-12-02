import { ApolloClient, gql } from '@apollo/client';

const CREATE_USER = gql`
mutation createUser($username: String!, $password: String!){
  createUser( username: $username, password: $password) {
    id
  }
}

`;

const LOG_USER = gql`
  mutation logUser($username: String!, $password: String!) {
    logUser(username: $username, password: $password)
  }
`;

export async function CreateUser(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>,
  password: Readonly<string>
): Promise<number> {
  console.debug('AuthenticationService.CreateUser');

  return client
    .mutate({
      mutation: CREATE_USER,
      variables: {
        username: username,
        password: password,
      },
    })
    .then((response: any) => {
        console.debug('id:', response.data.createUser.id);
      return response.data.createUser.id;
    })
    .catch((error: any) => {
      console.error('CreateUser error:', error);
      return 0;
    });
}

export async function LogUser(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>,
  password: Readonly<string>
): Promise<string> {
  console.debug('AuthenticationService.LogUser');

  return client
    .mutate({
      mutation: LOG_USER,
      variables: {
        username: username,
        password: password,
      },
    })
    .then((response: any) => {
        console.debug('response.data.logUser:', response.data.logUser);
        return response.data.logUser;
    })
    .catch((error: any) => {
      console.error('LogUser error:', error);
      return '';
    });
}
