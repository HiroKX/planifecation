import {gql} from "@apollo/client";

const CREATE_USER = gql`
    mutation createUser($login: String!, $password: String!) {
        createUser(login: $login, password: $password) {
            id,
            login,
            password
        }
    }
`;

const SignUpService = (props: any) => {
    props.client
        .mutate({
            mutation: CREATE_USER,
            variables: {
                login: props.login,
                password: props.password,
            },
        })
        .then((response: any) => {
            // Handle the response if needed
        })
        .catch((error: any) => {
            // Handle errors if the mutation fails
            console.error("SignUp Error:", error);
        });

    return;
}

export default SignUpService;