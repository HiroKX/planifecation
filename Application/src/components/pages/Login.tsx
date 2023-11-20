import { useState } from 'react';
import SurfaceTemplate from '../templates/SurfaceTemplate';
import TextInputTemplate from '../templates/TextInputTemplate';
import ButtonTemplate from '../templates/ButtonTemplate';
import {ApolloConsumer} from "@apollo/client";
import {LogUser} from "../../services/AuthenticationService";

export default function Login({ navigation }: any) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    return (
        <ApolloConsumer>
            { client =>
                <SurfaceTemplate>
                    <TextInputTemplate
                    label="Identifiant"
                    value={login}
                    handleChangeText={(text) => setLogin(text)}
                    />
                    <TextInputTemplate
                    label="Mot de passe"
                    mode='outlined'
                    value={password}
                    handleChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}/>
                    <ButtonTemplate
                      handleClick={() => {
                          LogUser({client, login, password});
                          navigation.navigate('Dashboard');
                      }}>
                        Se connecter
                    </ButtonTemplate>
                </SurfaceTemplate>
            }
        </ApolloConsumer>
    );
}