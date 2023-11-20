import { StyleSheet, View } from 'react-native';
import SurfaceTemplate from '../templates/SurfaceTemplate';
import ButtonTemplate from '../templates/ButtonTemplate';
import GoogleUp from '../sso/GoogleUp';
import {GetLoggedUser} from "../../services/AuthenticationService";

export default function Home({ navigation }: any) {
    GetLoggedUser()
        .then((user: { login: any; token: any; }) => {
        if (user.login != "") {
            console.log("Welcome back ", user.login, ". Redirection to dashboard...");
            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            });
        }})
        .catch((error: any) => { console.log("No logged user.") });
  return (
    <View>
      <SurfaceTemplate>
        <ButtonTemplate 
          handleClick={() =>  {
            navigation.navigate('Connexion');
            
          }}
        >
            Connexion
        </ButtonTemplate>
        <ButtonTemplate 
          handleClick={() => navigation.navigate('Inscription')} 
          mode='outlined'>Inscription
          </ButtonTemplate>
          <GoogleUp/>
      </SurfaceTemplate>
    </View>
  );
}

const styles = StyleSheet.create({
  button : {
    margin: 5,
  }
});
