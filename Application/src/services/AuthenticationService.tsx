import {gql} from "@apollo/client";

const CREATE_USER = gql`
    mutation createUser($login: String!, $password: String!) {
        createUser(login: $login, password: $password) {
            id,
            login
        }
    }
`;

const LOG_USER = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`;

export const CreateUser = (props: any) => {
    props.client
        .mutate({
            mutation: CREATE_USER,
            variables: {
                login: props.login,
                password: props.password,
            }
        })
        .then((response: any) => {
            // Handle the response if needed
        })
        .catch((error: any) => {
            // Handle errors if the inscription fails
            console.error("SignUp Error:", error);
        });
}

export const LogUser = (props: any) => {
    props.client
        .mutate({
            mutation: LOG_USER,
            variables: {
                username: props.login,
                password: props.password,
            }
        })
        .then((response: any) => {
            // Handle the response if needed
            console.log("Login success, response : ", response.data.login);
        })
        .catch((error: any) => {
            // Handle errors if the logging fails
            console.error("Login Error:", error);
        });
}