import {useState} from 'react';
import SurfaceTemplate from '../templates/SurfaceTemplate';
import TextInputTemplate from '../templates/TextInputTemplate';
import ButtonTemplate from '../templates/ButtonTemplate';
import {ApolloConsumer} from "@apollo/client";
import {CreateUser, LogUser} from "../../services/AuthenticationService";

export default function SignUp({ navigation }: any) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <ApolloConsumer>
            { client =>
                <SurfaceTemplate>
                    <TextInputTemplate
                      label="Adresse mail"
                      value={login}
                      handleChangeText={(text) => setLogin(text)}
                    />
                    <TextInputTemplate
                      label="Mot de passe"
                      mode='outlined'
                      value={password}
                      handleChangeText={(text) => setPassword(text)}
                      secureTextEntry={true}
                    />
                    <TextInputTemplate
                      label="Confirmer le mot de passe"
                      mode='outlined'
                      value={confirmPassword}
                      handleChangeText={(text) => setConfirmPassword(text)}
                      secureTextEntry={true}
                    />
                    <ButtonTemplate
                      handleClick={() => {
                        CreateUser({client, login, password});
                        LogUser({client, login, password});
                        navigation.replace('Dashboard');
                      }}>
                      M'inscrire
                    </ButtonTemplate>
                </SurfaceTemplate>
            }
        </ApolloConsumer>
    );
}