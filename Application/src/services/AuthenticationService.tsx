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

export async function CreateUser (props: any): Promise<Number> {
    console.debug("AuthenticationService.CreateUser");
    let userId = await CreateFromClient(props);
    return new Promise<Number>((resolve, reject) => {
        if (userId != 0) {
            console.log("User ", userId, " created with login ", props.login);
            resolve(userId);
        }
        else reject("Token is empty");
    });
}

export async function LogUser(props: any): Promise<string> {
    console.debug("AuthenticationService.LogUser");
    let token = await LogUserFromClient(props);
    return new Promise<string>((resolve, reject) => {
        if (token != "") {
            console.log("User ", props.login, " logged in")
            resolve(token);
        }
        else reject("Token is empty");
    });
}

// ---------------- Calls to the ApolloClient ----------------

const CreateFromClient = async (props: any): Promise<Number> => {
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
};

const LogUserFromClient = async (props: any): Promise<string> => {
  return props.client
    .mutate({
      mutation: LOG_USER,
      variables: {
        username: props.login,
        password: props.password,
      },
    })
    .then((response: any): string => {
      return response.data.login;
    })
    .catch((error: any) => {
      console.error('Login error:', error);
      return '';
    });
};
