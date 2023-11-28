import { StyleSheet, View } from 'react-native';
import SurfaceTemplate from '../organisms/SurfaceTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import GoogleButton from '../atoms/sso/GoogleButton';
import { StackParamList } from '../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from "../../utils/redux/Store";

type Props = NativeStackScreenProps<StackParamList>;

export default function Home({ navigation }: Readonly<Props>) {
    const loggedUserState = useAppSelector(state => state.loggedUser);
    const loggedUser = loggedUserState.loggedUser;

    console.debug("Called useAppSelector to get loggedUser: ", loggedUser);
    if (loggedUser != undefined && loggedUser.username != "") {
        console.log("Welcome back ", loggedUser.username, ". Redirection to dashboard...");
        navigation.reset({
            index: 0,
            routes: [{name: 'Dashboard'}],
        });
    }

  return (
    <View>
      <SurfaceTemplate style={styles.container}>
        <ButtonTemplate
          onPress={() => {
            navigation.navigate('Connexion');
          }}
        >
          Connexion
        </ButtonTemplate>
        <ButtonTemplate
          onPress={() => navigation.navigate('Inscription')}
          mode="outlined"
        >
          Inscription
        </ButtonTemplate>

      </SurfaceTemplate>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
  },
  container: {
    alignItems: 'center',
  },
});
