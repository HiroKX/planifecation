import { StyleSheet, View } from 'react-native';
import SurfaceTemplate from '../organisms/SurfaceTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import GoogleButton from '../atoms/sso/GoogleButton';
import {GetLoggedUser} from "../../services/AuthenticationService";
import { StackParamList } from '../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<StackParamList>;

export default function Home({ navigation }: Readonly<Props>) {
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
      <SurfaceTemplate style={styles.container}>
        <ButtonTemplate 
          onPress={() =>  {
            navigation.navigate('Connexion');
          }}
        >
            Connexion
        </ButtonTemplate>
        <ButtonTemplate 
          onPress={() => navigation.navigate('Inscription')} 
          mode='outlined'>Inscription
          </ButtonTemplate>
          <GoogleButton/>
      </SurfaceTemplate>
    </View>
  );
}

const styles = StyleSheet.create({
  button : {
    margin: 5,
  },
  container: {
    alignItems: 'center',
  }
});
