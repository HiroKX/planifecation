import { gql } from '@apollo/client';

// ---------------- METIER ----------------

export async function CreateUser (props: any): Promise<Number> {
    console.debug("AuthenticationService.CreateUser");
    let userId = await CreateFromClient(props);
    return new Promise<Number>((resolve, reject) => {
        if (userId != 0) {
            resolve(userId);
        }
        else reject("Error while creating user");
    });
}

export async function LogUser(props: any): Promise<string> {
    console.debug("AuthenticationService.LogUser");
    let token = await LogUserFromClient(props);
    return new Promise<string>((resolve, reject) => {
        if (token != "")
            resolve(token);
        else
            reject("Error while logging user");
    });
}

// ---------------- ApolloClient ----------------

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

const CreateFromClient = async (props: any): Promise<Number> => {
    console.debug("AuthenticationService.CreateFromClient");
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
        }).catch((error: any) => {
            console.error('SignUp error:', error);
            return 0;
        });
};

const LogUserFromClient = async (props: any): Promise<string> => {
    console.debug("AuthenticationService.LogUserFromClient");
    return props.client
        .mutate({
            mutation: LOG_USER,
            variables: {
                username: props.login,
                password: props.password,
            },
        }).then((response: any): string => {
            return response.data.login;
        }).catch((error: any) => {
            console.error('Login error:', error);
            return '';
        });
};
