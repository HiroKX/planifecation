import {CreateUser, LogUser} from "../services/AuthenticationService";
import * as SecureStore from "expo-secure-store";

export async function SignUpUser(client: any, login: string, password: string, navigation: any) {
    console.debug("AuthenticationController.SignUpUser");
    await CreateUser({client, login, password}).then(async userId => {
        if (userId != 0)
            await SignInUser(client, login, password, navigation);
        else
            navigation.replace('Connexion');
    })
}

export async function SignInUser(client: any, login: string, password: string, navigation: any) {
    console.debug("AuthenticationController.SignInUser");
    await LogUser({client, login, password}).then(async token => {
        if (token != "") {
            await SetLoggedUser(login, token);
            navigation.reset({
                index: 0,
                routes: [{name: 'Dashboard', params: {username: login, token: token}}],
            });
        }
    })
}

async function SetLoggedUser(username: string, token: string) {
    console.debug("AuthenticationController.SetLoggedUser");
    await SecureStore.setItemAsync("loggedUser", username);
    await SecureStore.setItemAsync("loggedUserToken", token);
}

export default async function GetLoggedUser() {
    console.debug("AuthenticationController.GetLoggedUser");
    const username = await SecureStore.getItemAsync("loggedUser");
    const token = await SecureStore.getItemAsync("loggedUserToken");

    return {username, token};
}

export async function GetLoggedUserUsername() {
    console.debug("AuthenticationController.GetLoggedUserUsername");
    return await SecureStore.getItemAsync("loggedUser");
}

export async function GetLoggedUserToken() {
    console.debug("AuthenticationController.GetLoggedUserToken");
    return await SecureStore.getItemAsync("loggedUserToken");
}

export async function LogoutUser(navigation: any) {
    console.debug("AuthenticationController.LogoutUser");
    await SecureStore.deleteItemAsync("loggedUser");
    await SecureStore.deleteItemAsync("loggedUserToken");
    navigation.reset({
        index: 0,
        routes: [{name: 'Accueil'}],
    });
}