import { gql } from '@apollo/client';

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

export async function CreateUser(props: any): Promise<Number> {
  console.debug('AuthenticationService.CreateUser');

  return props.client
    .mutate({
      mutation: CREATE_USER,
      variables: {
        login: props.login,
        password: props.password,
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

export async function LogUser(props: any): Promise<string> {
  console.debug('AuthenticationService.LogUser');

  return props.client
    .mutate({
      mutation: LOG_USER,
      variables: {
        username: props.login,
        password: props.password,
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
