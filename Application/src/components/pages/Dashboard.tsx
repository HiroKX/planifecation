import SurfaceTemplate from '../templates/SurfaceTemplate';
import AppTemplate from '../templates/AppTemplate';
import {GetLoggedUser, DisconnectUser} from "../../services/AuthenticationService";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/RootStack';

type Props = NativeStackScreenProps<StackParamList>;

async function Disconnect({navigation}:Props) {
    console.log("Disconnecting...");
    await DisconnectUser().then(() => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Accueil' }],
        });
        //navigation.replace('Accueil');
    });
}

export default function Dashboard({ navigation }: Props) {
    GetLoggedUser().then((user: { login: any; token: any; }) => {
        console.log("Everybody says 'welcome on the dashboard' to ", user.login);
        console.log("Look at his beautiful token : ", user.token);
    });
  return (
      <SurfaceTemplate>
          <AppTemplate icon="door-sliding" handleClick={async () => await Disconnect(navigation) } />
      </SurfaceTemplate>
  );
}

/*
        <AppTemplate icon="pencil"/>
        <AppTemplate icon="cog"/>
        <AppTemplate icon="moon-waning-crescent"/>
        <AppTemplate icon="car"/>
        <AppTemplate icon="check"/>
        <AppTemplate icon="weather-sunny"/>
 */
