import { ApolloClient, gql } from '@apollo/client';
import { URI_AUTHENTICATION } from '@env';

const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
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
    });
}

export async function LogUser(
  username: Readonly<string>,
  password: Readonly<string>
): Promise<string[]> {
  console.debug('AuthenticationService.LogUser');
  return fetch(URI_AUTHENTICATION + '/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse response body as JSON
    })
    .then((data: any) => {
      console.log('response.data.logUser:', data); // Log the parsed JSON data
      return [data.accessToken, data.refreshToken]; // Return the required data
    })
    .catch((error: Error) => {
      console.error('Error:', error.message); // Handle any errors
      return ['Not Logged !'];
    });
}

export async function RelogUserService(
  refreshToken: Readonly<string>
): Promise<string[]> {
  console.debug('AuthenticationService.RelogUser');
  return await fetch(URI_AUTHENTICATION + '/refresh', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: refreshToken,
    },
  })
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse response body as JSON
    })
    .then((data: any) => {
      console.log('response.data.RelogUser:', data); // Log the parsed JSON data
      return [data.accessToken, data.refreshToken]; // Return the required data
    })
    .catch((error: Error) => {
      console.error('Error:', error.message); // Handle any errors
      return ['Not ReLogged !'];
    });
}
