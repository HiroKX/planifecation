import {gql} from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    let userId = await CreateFromClient(props);
    return new Promise<Number>((resolve, reject) => {
        if (userId != 0) {
            console.debug("User ", userId, " created with login ", props.login);
            resolve(userId);
        }
        else reject("Token is empty");
    });
}

export async function LogUser(props: any): Promise<string> {
    let token = await LogUserFromClient(props);
    if (token != "") {
        console.debug("User ", props.login, " logged in")
        try {
            const jsonValue = JSON.stringify({
                login: props.login,
                token: token
            });
            await AsyncStorage.setItem('loggedUser', jsonValue);
        } catch (e) {
            console.error("LogUser AsyncStorage error : ", e);
        }
    }
    return new Promise<string>((resolve, reject) => {
        if (token != "") resolve(token);
        else reject("Token is empty");
    });
}

export async function GetLoggedUser  () {
    try {
        const jsonValue = await AsyncStorage.getItem('loggedUser');

        return new Promise<any>((resolve, reject) => {
            if (jsonValue != null) resolve(JSON.parse(jsonValue));
            else reject("No logged user");
        });
    } catch (e) {
        console.error("GetLoggedUser error : ", e);
    }
}

export async function isLoggedUser(): Promise<boolean> {
    try {
        const jsonValue = await AsyncStorage.getItem('loggedUser');
        if (jsonValue != null) return true;
        else return false;
    } catch (e) {
        console.error("GetLoggedUser error : ", e);
        return false;
    }
}

export async function DisconnectUser() {
    try {
        await AsyncStorage.removeItem('loggedUser');
    } catch (e) {
        console.error("Disconnect error : ", e);
    }
}

// ---------------- Calls to the ApolloClient ----------------

const CreateFromClient = async (props: any): Promise<Number> => {
    return props.client
        .mutate({
            mutation: CREATE_USER,
            variables: {
                login: props.login,
                password: props.password,
            }
        })
        .then((response: any) => {
            return response.data.createUser.id;
        })
        .catch((error: any) => {
            console.error("SignUp error:", error);
            return 0;
        });
}

const LogUserFromClient = async (props: any): Promise<string> => {
    return props.client
        .mutate({
            mutation: LOG_USER,
            variables: {
                username: props.login,
                password: props.password,
            }
        })
        .then((response: any): string => {
            return response.data.login;
        })
        .catch((error: any) => {
            console.error("Login error:", error);
            return "";
        });
}